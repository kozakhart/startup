const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const DB = require('./database.js');
const port = process.argv.length > 2 ? process.argv[2] : 3000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
    console.log('Existing user');
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    console.log(user);
    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.status(200).send({
        msg: 'Login successful',
        id: user._id
      });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);
//express.static('protected')

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
    } else {
      res.redirect('/login.html');
    }
  }
);

secureApiRouter.get('/shop.html', (req, res) => {
  console.log('Serving shop.html');
  res.sendFile(path.join(__dirname, 'protected', 'shop.html'));
});


secureApiRouter.get('/account.html', (req, res) => {
  // Assuming your 'protected' folder is at the same level as your 'app.js'
  res.sendFile(path.join(__dirname, 'protected', 'account.html'));
});

secureApiRouter.post('/user/orders', async (_req, res) => {
  
  const username = _req.body.customer;
  try {
      const orders = await DB.getOrdersByUser(username);
      if (!orders || orders.length === 0) {
          // No orders found
          return res.status(404).json({ message: 'No orders found' });
      }
      // Successfully found orders, send them back
      res.status(200).json(orders);
  } catch (error) {
      console.error('Failed to get orders:', error);
      res.status(500).json({ message: 'Failed to get orders' });
  }
});
  
secureApiRouter.post('/orders', async (req, res) => {
  try {
      const order = await DB.createOrder(req.body);
      if (!order) {
          // Handle case where order is not successfully created
          return res.status(400).json({ message: 'Order could not be created' });
      }
      // Successfully created order, send it back
      res.status(200).json(order);
  } catch (error) {
      console.error('Failed to create order:', error);
      res.status(500).json({ message: 'Failed to create order' });
  }
});

// delete orders on account page
secureApiRouter.delete('/orders', async (req, res) => {
  try {
      const order = await DB.deleteOrder(req.body);
      console.log(order);
      if (!order) {
          // Handle case where order is not successfully deleted
          return res.status(400).json({ message: 'Order could not be deleted' });
      }
      // Successfully deleted order, send it back
      res.status(200).json(order);
      
  } catch (error) {
      console.error('Failed to delete order:', error);
      res.status(500).json({ message: 'Failed to delete order' });
  }
});

secureApiRouter.get('/user', async (_req, res) => {
  const authToken = _req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
  console.log(user);
});

secureApiRouter.post('/user', async (_req, res) => {
  const authToken = _req.cookies[authCookieName];
  const user = await DB.updateUserByToken(authToken, _req.body);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
  console.log(user);
}
);

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// delete orders on account page
// get user info on account page