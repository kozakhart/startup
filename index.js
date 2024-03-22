const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

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