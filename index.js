const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/orders', (_req, res) => {
    res.send(scores);
  });
  
apiRouter.post('/orders', (req, res) => {
    scores = updateOrders(req.body, scores);
    res.send(scores);
  });