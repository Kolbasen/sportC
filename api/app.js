'use strict';

const express = require('express');
const cors = require('cors');
const {
  authenticate, register, nextstepreg,
  getProfile, getAnotherProfile, upload
} = require('./services');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.post('/', getAnotherProfile);
app.post('/auth', authenticate);
app.post('/register',  register);
app.post('/nextstepreg',  upload.single('avatar'), nextstepreg);
//app.get('/profile', getProfile)
app.post('/profile', getProfile);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
