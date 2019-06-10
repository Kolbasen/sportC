'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
    return db.createTable('auth', {
    id: 'serial primary key',
    login: 'text',
    password: 'text',
    salt: 'text'
  })
  .then(
    function(result) {
      db.createTable('info', {
        id: 'serial primary key',
        login: 'text',
        name: 'text',
        surname: 'text',
        age: 'int',
        city: 'text',
        info: 'text',
        drink1: 'text',
        drink2: 'text',
        drink3: 'text',
        avatar: 'text'
      });
    })
    .then(
      function(result) {
        db.createTable('results', {
          id: 'serial primary key',
          login: 'text',
          seen: 'text',
          accepted: 'text',
          likedby: 'text'
        })
      }
    )
    .then(
      function(result) {
        db.createTable('amount', {
          amount: {
            type: 'bigint',
            default: 0
          }
        }, 
        function(err) {
          return;
        }
        )
      }
    )
    // db.createTable('info', {
    //   //id: 'serial primary key',
    //   login:'text',
    //   info: 'text',
    //   alco1: 'text',
    //   alco2: 'text',
    //   alco3: 'text',
    // })
    
};

exports.down = function (db) {
  return db.dropTable('auth')
  .then(
    function(result) {
      db.dropTable('info');
    })
    .then(
      function(result){
      db.dropTable('results')
    }) 
    .then(
      function(result) {
        db.dropTable('amount');
      }, 
      function(err) {
        return;
      }
    )
};

exports._meta = {
  "version": 1
};
