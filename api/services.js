'use strict';

const crypto = require('crypto');
const { take, insertPasswd, insertInfo,
  increaseCounter, selectCounter, takeId,
  updateLikedby, updateSeen } = require('./db');
const jwt = require('jsonwebtoken');
const config = require('./config');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: '../client/src/public/uploads/',
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
});



function validPassword(login, password) {
  return new Promise(resolve => {
    take(login, 'auth')
      .then(res => {
        const salt = res.rows[0].salt.toString('hex');
        const hash = crypto.pbkdf2Sync(
          password, salt, 1000, 64, 'sha256')
          .toString('hex');
        if (res.rows[0].password === hash) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => console.log(err));
  });
}

function setPassword(login, password) {
  return new Promise(resolve => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash1  = crypto.pbkdf2Sync(password, salt,
      1000, 64, 'sha256').toString('hex');
    insertPasswd(login, hash1, salt)
      .then(() => {
        resolve(true);
      })
      .catch(err => console.log(err));
  });
}


function authenticate(req, res) {
  const { login, passwd } = req.body;
  take(login, 'auth')
    .then(result => {
      if (result.rows.length !== 0) {
        validPassword(login, passwd)
          .then(idInfo => {
            if (idInfo) {
              const token = jwt.sign(
                { login, id: result.rows[0].id },
                config.secret.toString()
              );
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
          .then(idInfo => {

            if (idInfo) {
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

function nextstepreg(req, result) {
  const info = JSON.parse(req.body.info);
  info.ava = req.file.originalname;
  info.age = Number(info.age);
  insertInfo(info)
    .then(() => increaseCounter()
      .then(() => result.send('Info added')))
    .catch(err => console.log(err));
  //res.json(1)
}

function getProfile(req, res) {
  const { login } = req.body;
  take(login, 'info')
    .then(result => res.json(result.rows[0]));
}

function getAnotherProfile(req, res) {
  selectCounter()
    .then(result => {
      takeId(req.body.id, 'results')
        .then(idInfo => {
          if (req.body.target) {
            select(req, res, result, idInfo);
          } else {
            start(result, idInfo, res);
          }
        });
    });
}

function start(result, idInfo, res) {
  const id = [];
  const { amount } = result.rows[0];
  for (let i = 1; i <= amount; i++) {
    id.push(i);
  }
  const seen = idInfo.rows[0].seen.split(',');
  seen.push(idInfo.rows[0].id);
  for (let i = 0; i < id.length; i++) {
    for (let j = 0; j < seen.length; j++) {
      if (id[i] === +seen[j]) {
        id.splice(i, 1);
        i--;
      }
    }
  }
  if (id.length === 0) {
    res.json({ 'left': false });
  } else  {
    const newId = id[Math.floor(Math.random() * (id.length))];
    takeId(newId, 'info')
      .then(response => {
        res.json({ 'first': response.rows[0], 'second': 123 });
      });
  }
}

function select(req, res, result, idInfo) {
  const likedby = `${idInfo.rows[0].likedby},${req.body.id}`;
  const seen = `${idInfo.rows[0].seen},${req.body.target}`;
  updateSeen(seen, req.body.id)
    .then(() => {
      if (req.body.action === 'Approve') {
        updateLikedby(likedby, req.body.target)
          .then(() => {
            newPerson(req, res, result);
          });
      } else {
        newPerson(req, res, result);
      }

    });
}

function newPerson(req, res, result) {
  takeId(req.body.id, 'results')
    .then(info => {
      if (+info.rows[0].likedby === 0) {
        start(result, info, res);
      } else {
        const curr = info.rows[0].likedby.split(',').splice(0, 1);
        const newId = Math.floor(Math.random() * (curr.length));
        takeId(newId, 'info')
          .then(response => {
            res.json(response.rows[0]);
          });
      }
    });
}


module.exports = {
  upload,
  authenticate,
  register,
  nextstepreg,
  getProfile,
  getAnotherProfile,
};



