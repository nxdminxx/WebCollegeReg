const mysql = require('mysql');
require('dotenv').config();

var Connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.envDB_NAME,
});

Connection.connect((err) => {
    if(!err){
        console.log("Connected");
    }
    else{
        console.log(err);
    }
});

Connection.query('USE Collegeu');

module.exports = Connection;