const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learning-management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Utility function to query the database
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  };
  
module.exports = { query };

