const mysql = require('mysql2/promise');
let { config, setting } = require('./db/config.js');
const ExcelJS = require('exceljs');
const bcrypt = require("bcrypt");
const { createHmac } = require('node:crypto');

const secret = 'abcdefg';

// const db = await mysql.createConnection({
//     host: "localhost",
//     user: "tester",
//     password: "TestpassW0rk",
//     database: "authoi"
// })

function getDBConnection(callback) {
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, connection);
    });
};

exports.readjson = (filePath) => {
    let obj;
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
       return obj;
    });
}

exports.saveUser = async (name, user, password) => {

     const conn = await mysql.createConnection(config);
     let sqlcheck = "SELECT * FROM users where username = '" + user + "'";

     let isExit = (await conn.execute(sqlcheck));
     console.log(isExit[0].length);
     if(isExit[0].length > 0){
        return 0;
     } else {
        let sqlquery = "INSERT INTO users(full_name,username,password) VALUES ('" + name + "','" + user + "','" + password +"')";
        let x = (await conn.execute(sqlquery));
        // if (err) {
        //     console.log(err);
        //     return -1;
        // }
        return 1;
     }

}

exports.exec = async (query, data, callback) => {
    var self = this;
    this.getDBConnection(function(err, connection){
        if(err){
            console.log('error');
            return callback(err);
        }
        console.log(connection);
        connection.query(query, data, function(err, results) {
            self.endDBConnection(connection);
            if(err) {
                return callback(err);
            }
            callback(null, results);
        });
    });
}

exports.loadDb = async (conn) => {
    if(conn!= undefined){
        conn = await  mysql.createConnection(config);
    }
    let sqlquery = "SELECT * FROM users"

    let x = (await conn.execute(sqlquery));
    conn.close()
    console.log(x[0][0])
    return x[0][0];
}

exports.loadUser = async (user, password) => {

    const conn = await mysql.createConnection(config);
    let sqlcheck = "SELECT * FROM users where username = '" + user + "'";

    let isExit = (await conn.execute(sqlcheck));
    if(isExit[0].length > 0){
  
       let ck = bcrypt.compare(password, isExit[0][0].password);
       const hash = createHmac('sha256', secret)
               .update(user)
               .digest('hex');

       if(ck){
        var date_time = new Date();
        var expiredDate =new Date('2099-12-31');
        let sqlquery = "INSERT INTO sesstbl(sessid,createdBy,createdDate,expiredDate) VALUES ('" + hash + "',1,'" + date_time.toISOString().slice(0, 19).replace('T', ' ') +"','" + expiredDate.toISOString().slice(0, 19).replace('T', ' ') + "')";
        let x = (await conn.execute(sqlquery));
       }
       
        return ck;
    } else {
       return 0;
    }

}



exports.readXml = (filePath) => {
    if (!filePath || !isString(filePath)) {
        throw new Error("Error path not found. ");
    }
    return new Promise < string > ((resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(file);
        });
    });
}

exports.readCsv = (filePath) => {

    if (!filePath || !isString(filePath)) {
        throw new Error("Error path not found. ");
    }
    return new Promise < string > ((resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(file);
        });
    });
}

exports.readTable = (filePath) => {

    if (!filePath || !isString(filePath)) {
        throw new Error("Error path not found. ");
    }
    return new Promise < string > ((resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(file);
        });
    });
}

exports.readAPI = (url) => {

    if (!url || !isString(url)) {
        throw new Error("Error url not correct. ");
    }
    return new Promise < string > ((resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(file);
        });
    });
}

exports.read = (filePath) => {

    if (!filePath || !isString(filePath)) {
        throw new Error("Error path not found. ");
    }
    return new Promise < string > ((resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(file);
        });
    });
}

exports.readXls = (filePath) => {
    const wb = new ExcelJS.Workbook();

    wb.xlsx.readFile(filePath).then(() => {

        const ws = wb.getWorksheet('Sheet1');

        const c1 = ws.getColumn(1);

        c1.eachCell(c => {

            console.log(c.value);
        });

        const c2 = ws.getColumn(2);

        c2.eachCell(c => {

            console.log(c.value);
        });
    }).catch(err => {
        console.log(err.message);
    });
}

