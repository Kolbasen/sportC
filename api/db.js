const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'andrew',
  host: 'localhost',
  database: 'website',
  password: '1234',
  port: 5432,
})

function take(login, table) {
  return new Promise((resolve, reject) => {
    const userData = pool.query(`SELECT * FROM ${table} WHERE login=$1`, [login]);
    resolve(userData);
  })
}

function takeId(id, table) {
  return new Promise((resolve, reject) => {
    const userData = pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id]);
    resolve(userData);
  })
}
  
  function insertPasswd(login, password, salt) {
    return new Promise((resolve, reject) => {
      const newUserData = pool.query(`INSERT INTO auth (login, password, salt) values($1, $2, $3)`, [login, password, salt]);
      resolve(newUserData);
    })
  }

  function insertInfo(UserInfo) {
    arr = []
    for (key in UserInfo) {
      arr.push(UserInfo[key]);
    }
    return new Promise((resolve, reject) => {
      const newUserInfo = pool.query(`INSERT INTO info (login, name, surname, age, city, info, drink1, drink2, drink3, avatar) values($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)`,arr);
      resolve(newUserInfo);
    })
  }

  function increaseCounter() {
    return new Promise((resolve, rej) => {
       pool.query('UPDATE amount SET amount = amount + 1')
       resolve(true)
    })
  }

  function selectCounter() {
    return new Promise((resolve, rej) => {
        const counter= pool.query('SELECT amount FROM amount')
        resolve(counter)
    }) 
}

function updateSeen(seen, id) {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE results SET seen = $1 WHERE id = $2`, [seen, id])    
    resolve(true)
  })
}

function updateLikedby(likedby, id) {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE results SET likedby = $1 WHERE id = $2`, [likedby, id])    
    resolve(true)
  })
}

module.exports = {
    take,
    //update,
    insertPasswd,
    insertInfo,
    selectCounter,
    increaseCounter,
    takeId,
    updateSeen,
    updateLikedby
}