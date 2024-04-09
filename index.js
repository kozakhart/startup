const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);
const DB = require('./database.js');

const authCookieName = 'token';

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


let orders = [];

apiRouter.get('/orders', (_req, res) => {
    res.json(orders);
  });
  
apiRouter.post('/orders', (req, res) => {
    const newOrder = req.body;
    newOrder.timestamp = new Date().getTime();

    orders.push(newOrder);

    res.json(orders);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
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