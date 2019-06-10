const express = require('express')
const crypto = require('crypto');
const {take, insertPasswd, insertInfo, increaseCounter, selectCounter, takeId, updateLikedby, updateSeen} = require('./db');
const jwt = require('jsonwebtoken')
const config = require('./config')
const multer = require('multer');
const secret = require('./config.json');



 function validPassword(login, password) {
     return new Promise((resolve, reject)=> {
        take(login, "auth")
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
        insertPasswd(login, hash1, salt)
        .then(res => {
            console.log(1);
            resolve(true);
        })
        .catch(err => console.log(err));
       })
}; 


function authenticate(req, res) {
    const {login, passwd} = req.body;
    console.log(login, passwd);
    take(login, "auth")
    .then(result => {
        if (result.rows.length != 0) {
            validPassword(login, passwd)
            .then(result1 => {
                if (result1) {
                const token = jwt.sign({login: login, id: result.rows[0].id}, config.secret.toString());
                res.status(200).json(token);
            } else {
                res.status(401).send("Incorrect password!");
            }   
            })
        } else {
           res.status(401).send("No user found");
        }
    })
    .catch(err => res.send(err));
}

function register(req, res) {
    const {login, passwd} = req.body;
    take(login, "auth")
    .then(result => {
        if (result.rows.length == 0) {
            setPassword(login, passwd)
            .then(result1 => {

                if (result1) {
                    res.status(200).send("Successfull registration!");
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

function nextstepreg(req, result) {
    console.log(Math.random())
    console.log(req.body)
    const info = JSON.parse(req.body.info);
    console.log(req.file)
    info.ava = req.file.originalname;
    console.log(info)
    info.age = Number(info.age)
    insertInfo(info)
    .then(res2 => console.log(true))
    .then(res => increaseCounter()
    .then(res1 => result.send("Info added")))
    .catch(err => console.log(err))
    //res.json(1)
}

function getProfile(req, res) {
    console.log(req.body)
    const {login} = req.body;
    take(login, "info")
    .then(result=> res.json(result.rows[0]))
}

function getAnotherProfile(req, res) {
    console.log(req.body)
    selectCounter()
    .then(result => {
        takeId(req.body.id, "results")
        .then(result1 => {
            //console.log(result1)
            if (req.body.target) {
                select(req, res, result, result1)
            } else {
                start(result, result1, res)        
            }   
        })
    })    
}

function start(result, result1, res) {
    const id = []
    console.log(result1)
    const {amount} = result.rows[0];
    console.log(amount)
    for (let i = 1; i <= amount; i++) {
        id.push(i);            
    }
    console.log(id)
    const seen = result1.rows[0].seen.split(",")
    seen.push(result1.rows[0].id)
    console.log(seen)
    for (let i = 0; i < id.length; i++) {
        for (let j = 0; j < seen.length; j++) {
            if (id[i] == seen[j]) {
                id.splice(i, 1);
                i--;
            }
        }
    }
    console.log(id)   
    console.log(id.length)
    const newId = id[Math.floor(Math.random()*(id.length))]
    console.log(newId);
    takeId(newId, 'info')
    .then(response => {
        console.log(response)
        res.json(response.rows[0])
    })
}

function select(req, res, result, result1 ) {
    console.log(req.body)
    console.log(result1.rows[0].seen)
    console.log(req.body.target)
    const likedby = `${result1.rows[0].likedby},${req.body.id}`;
    const seen = `${result1.rows[0].seen},${req.body.target}`
    console.log(seen)
    updateSeen(seen, req.body.id)
    .then(res1 => {
        updateLikedby(likedby, req.body.target)
        .then(res2 => {
            takeId(req.body.id, "results")
            .then(info => {
                if (info.rows[0].likedby == 0) {
                    start(result, info, res)
                } else {
                    const curr = info.rows[0].likedby.split(",").splice(0,1)
                    const newId = Math.floor(Math.random()*(curr.length));
                    takeId(newId, "info")
                    .then(response => {
                        res.json(response.rows[0])                       
                    })
                }           
            })
        })
    })                
}

module.exports = {
    authenticate,
    register,
    nextstepreg,
    getProfile,
    getAnotherProfile
}


            