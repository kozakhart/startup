const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');
const localStorage = require('localstorage');
const port = process.argv.length > 2 ? process.argv[2] : 3000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

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

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
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