'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('auth', {
    id: 'serial primary key',
    login: 'text',
    password: 'text',
    salt: 'text'
  })
    .then(
      (result) => {
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
          drink3: 'text'
        });
      },
      err => {}
    );
  // db.createTable('info', {
  //   //id: 'serial primary key',
  //   login:'text',
  //   info: 'text',
  //   alco1: 'text',
  //   alco2: 'text',
  //   alco3: 'text',
  // })

};

exports.down = function(db) {
  return db.dropTable('auth')
    .then(
      (result) => {
        db.dropTable('info');
      },
      err => {}
    );
};

exports._meta = {
  'version': 1
};
