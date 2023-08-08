const { createPool } = require("mysql2");

const pool = createPool({
    host: 'localhost',
    user:'root',
    password:'',
    port:'3306',
    database : 'ecommerce'

})

module.exports = pool;