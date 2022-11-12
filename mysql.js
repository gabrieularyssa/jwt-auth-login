const mysql = require('mysql');

let pool = mysql.createPool({
    // "user":process.env.MYSQL_USERNAME,
    // "password":process.env.MYSQL_PASSWORD,
    // "database":process.env.MYSQL_DATABASE,
    // "host":process.env.MYSQL_HOST,
    // "port": process.env.MYSQL_PORT
    "user":"gabrieularyssa",
    "password":"gabri2022*",
    "database":"login",
    "host":"localhost",
    "port": 3306
})

exports.pool = pool