const crypto = require('crypto');
const db = require('./db');
const take = db.take;
const insert = db.insert;

 function validPassword(password) {
     return new Promise((resolve, reject)=> {
        take("ann")
        .then(res => {
            const hash = crypto.pbkdf2Sync(password,  "f1784c62fec0080cb64e2ce7c9f0af7f", 1000, 64, `sha256`).toString(`hex`);
           if (res.rows[0].password === hash) {
           resolve(true);          
           }
           })
     }) 
}; 

 function setPassword(password) { 
       return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');  
        const hash1  = crypto.pbkdf2Sync(password, salt,  
        1000, 64, `sha256`).toString(`hex`); 
        insert("ann", hash1, salt)
        .then(res => {
            console.log(1);
            resolve(true);
        });
       })
}; 


function authenticate(req, res) {
    const {login, passwd} = req.body;
    take(login)
    .then(result => {
        if (result.rows.length != 0) {
            validPassword(passwd)
            .then(result1 => {
                if (result1) {
                res.send("Success!");
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



module.exports = {
    authenticate
}


            