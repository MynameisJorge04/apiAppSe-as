const { createPool } = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection()
    .then(conn => {
        conn.ping()
            .then(() => console.log('Database connection is alive'))
            .catch(err => console.log('Error pinging database', err))
            .finally(() => conn.release());
    })
    .catch(err => console.log('Unable to connect to database', err));

module.exports = {
    pool
};


