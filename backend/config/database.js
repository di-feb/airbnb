const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',         // Your database host
  user: 'yourusername',      // Your database username
  password: 'yourpassword',  // Your database password
  database: 'airbnb',        // Your database name
});

module.exports = connection;