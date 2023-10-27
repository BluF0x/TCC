const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const router = require('./api/routes/router');
const cors = require('cors');
const app = express();

const allowedOrigins =  ['http://localhost:5173', 'http://localhost:4173'];

const options = {
  credentials: true,
  origin: allowedOrigins
};

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());
app.use(express.static('src/assets'))

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  cookieSession({
    name: 'session',
    keys: ['testKey1234'], // Change this to a secret key for better security
    maxAge: oneDay,
  })
);

app.use(router);
module.exports = app;
