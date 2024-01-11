//const { define } = require('./libs.js');
const dbutil = require('./dbconfig.js');
function define(key, value, type, nameApi) {
    Object.defineProperty(exports, key,  {
        value: {
            value: value,
            type: type,
            api: nameApi
        },
    });
}


define("STATUS", "CALL filterStatus(?)", "API", "getAllStatus");
define("BOOK", "CALL filterBook(?)", "API", "getAllBook");


