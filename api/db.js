const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'andrew',
  host: 'localhost',
  database: 'website',
  password: '1234',
  port: 5432,
})

function take(login) {
    return new Promise((resolve, reject) => {
    const userData = pool.query('SELECT * FROM auth WHERE login=$1', [login]);
    resolve(userData);
   })
  }
  
  function insert(login, password, salt) {
    return new Promise((resolve, reject) => {
      const newUserData = pool.query('INSERT INTO auth (login, password, salt) values($1, $2, $3)', [login, password, salt]);
      resolve(newUserData);
    })
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
    insert
}