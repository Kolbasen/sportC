'use strict';

const express = require('express');
const crypto = require('crypto');
const { take, insertPasswd, insertInfo } = require('./db');
const jwt = require('jsonwebtoken');
const config = require('./config');
const multer = require('multer');
const secret = require('./config.json');



function validPassword(login, password) {
  return new Promise((resolve, reject) => {
    take(login, 'auth')
      .then(res => {
        const salt = res.rows[0].salt.toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        if (res.rows[0].password === hash) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => console.log(err));
  });
};

function setPassword(login, password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash1  = crypto.pbkdf2Sync(password, salt,
      1000, 64, 'sha256').toString('hex');
    insertPasswd(login, hash1, salt)
      .then(res => {
        console.log(1);
        resolve(true);
      })
      .catch(err => console.log(err));
  });
};


function authenticate(req, res) {
  const { login, passwd } = req.body;
  console.log(login, passwd);
  take(login, 'auth')
    .then(result => {
      if (result.rows.length !== 0) {
        validPassword(login, passwd)
          .then(result1 => {
            if (result1) {
              const token = jwt.sign({ login }, config.secret.toString());
              res.status(200).json(token);
            } else {
              res.status(401).send('Incorrect password!');
            }
          });
      } else {
        res.status(401).send('No user found');
      }
    })
    .catch(err => res.send(err));
}

function register(req, res) {
  const { login, passwd } = req.body;
  take(login, 'auth')
    .then(result => {
      if (result.rows.length === 0) {
        setPassword(login, passwd)
          .then(result1 => {
            if (result1) {
              res.status(200).send('Successfull registration!');
            } else {
              res.send('Ooop smth went wrong');
            }
          });
      } else {
        res.send('That login already exists!');
      }
    })
    .catch(err => res.send(err));
}

function nextstepreg(req, res) {
  console.log(Math.random());
  console.log(req.body);
  console.log(JSON.parse(req.body.info));
  console.log(req.file);
  insertInfo(JSON.parse(req.body.info))
    .then(res => console.log(true))
    .then(res1 => res.send('Info added'))
    .catch(err => console.log(err));
  //res.json(1)
}

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, 'IMAGE-' + Date.now() + file.originalname);
  }
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  //fileFilter: fileFilter
});

module.exports = {
  authenticate,
  register,
  nextstepreg,
  upload
};



