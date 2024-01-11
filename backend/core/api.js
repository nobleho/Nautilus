const dbutil = require('./dbutil.js');
let  { Pageable }= require("../model/pageable.js");
exports.getApi = function (name, params) {
    let pageable = {};
    pageable.isPaging = false;
    if (params === '') params = false;
    return dbutil.apiquery(name, params, pageable);
}