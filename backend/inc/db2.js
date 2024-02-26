const mysql = require('mysql2/promise');

const pool2 = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'cudatabase',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool2;