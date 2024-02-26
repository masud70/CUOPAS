var MySql = require('sync-mysql');

var syncPool = new MySql({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cudatabase'
});

module.exports = syncPool;