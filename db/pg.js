const { Pool } = require('pg');

// Connection Connection w/ Heroku
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// });

// Connection w/ localhost
const pool = new Pool({
    host: '127.0.0.1',
    user: 'upstay',
    password: 'upstay',
    database: 'upstay'
});

export const query = (text, params) => pool.query(text, params);
