'use strict';

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'andrew',
  host: 'localhost',
  database: 'website',
  password: '1234',
  port: 5432,
});

function take(login, table) {
  return new Promise((resolve, reject) => {
    const userData = pool.query(
      `SELECT * FROM ${table} WHERE login=$1`, [login]
    );
    resolve(userData);
  });
}

function insertPasswd(login, password, salt) {
  return new Promise((resolve, reject) => {
    const newUserData = pool.query(
      'INSERT INTO auth (login, password, salt) values($1, $2, $3)',
      [login, password, salt]
    );
    resolve(newUserData);
  });
}

function insertInfo(UserInfo) {
  const arr = [];
  for (key in UserInfo) {
    arr.push(UserInfo[key]);
  }
  return new Promise((resolve, reject) => {
    const newUserInfo = pool.query(
      `INSERT INTO info (login, name, surname, age, city, info, 
        drink1, drink2, drink3) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`, arr
    );
    resolve(newUserInfo);
  });
}
//   Waiting for the future
/*function update(chat, tag) {
    return new Promise((resolve, reject) => {
     const updateTag = pool.query('UPDATE tags SET amount = amount+1 WHERE chatid = $1 AND name = $2', [chatId, tag]);
     resolve(updateTag);
   })
  }
*/

module.exports = {
  take,
  //update,
  insertPasswd,
  insertInfo
};
