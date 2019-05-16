const crypto = require('crypto');
const db = require('./db');
const jwt = require('jsonwebtoken')
const config = require('./config')
const take = db.take;
const insert = db.insert;

 function validPassword(login, password) {
     return new Promise((resolve, reject)=> {
        take(login)
        .then(res => {
            let salt = res.rows[0].salt.toString('hex');
           const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
           if (res.rows[0].password === hash) {
           resolve(true);          
           } else {
               resolve(false);
           }
           })
           .catch(err => console.log(err));
     }) 
}; 

 function setPassword(login, password) { 
       return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');  
        const hash1  = crypto.pbkdf2Sync(password, salt,  
        1000, 64, `sha256`).toString(`hex`); 
        insert(login, hash1, salt)
        .then(res => {
            console.log(1);
            resolve(true);
        })
        .catch(err => console.log(err));
       })
}; 


function authenticate(req, res) {
    const {login, passwd} = req.body;
    take(login)
    .then(result => {
        if (result.rows.length != 0) {
            validPassword(login, passwd)
            .then(result1 => {
                if (result1) {
                const token = jwt.sign({login: login}, config.secret.toString());
                res.status(200).json(token);
            } else {
                res.send("Incorrect password!");
            }   
            })
        } else {
           res.send("No user found");
        }
    })
    .catch(err => res.send(err));
}

function register(req, res) {
    const {login, passwd} = req.body;
    take(login)
    .then(result => {
        if (result.rows.length == 0) {
            setPassword(login, passwd)
            .then(result1 => {
                if (result1) {
                    res.send("Success!");
                } else {
                    res.send("Ooop smth went wrong")
                }
            })
        } else {
            res.send("That login already exists!");
        }
    })
    .catch(err => res.send(err));
}


module.exports = {
    authenticate,
    register
}


            