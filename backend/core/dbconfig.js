var mysql = require('mysql2/promise');
let {setting } = require('./config.js');


exports.loadConfig = async function () {
    const conn = await mysql.createConnection(setting);
    let sqlquery = "SELECT * FROM api_tenant WHERE id = 1 "
    let x = (await conn.execute(sqlquery));
    conn.close()
    return x[0][0];
}
