const My = require("jm-ez-mysql");

// Init DB Connection
My.init({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});