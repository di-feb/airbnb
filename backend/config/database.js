const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',        // Your database host
    port: 3307,               // Port  
    user: 'root',             // Database username
    password: '',             // Database password
    database: 'airbnb'        // Your database name
});

connection.connect(function (err) {
    if (err) {
        console.log('Not connected to database');
        throw err;
    } else {
        console.log('Connected to database');
    }
});


module.exports = connection;
