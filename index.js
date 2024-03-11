const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
