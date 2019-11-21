const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

