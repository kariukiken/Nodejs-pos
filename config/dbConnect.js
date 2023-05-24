const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pos_system'
});



module.exports = pool;


/*
const pool = mysql.createPool({
	host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

// Create MySQL connection pool
const pool = mysql.createPool({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT

});


*/
