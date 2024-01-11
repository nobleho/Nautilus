const mysql = require('mysql2/promise');
let {config, setting } = require('./config.js');
const api = require('./constant.js');

async function query(sqlquery, table, params) {
    const conn = await mysql.createConnection(config);
    let x = (await conn.execute(sqlquery, params));
    return x[0][0];
}

exports.apiquery = async function (id, params, pageable) {

    if (id === 'book') {
        if(pageable.isPaging){
            let data = await query(api.BOOK.value, id, [params]);
            return paginator(data, pageable.page, pageable.size)
        } else
        return await query(api.BOOK.value, id, [params]);
    } else if (id === 'status') {
        return await query(api.STATUS.value, id, [params]);
    } else {
        return [];
    }
}

exports.loadConfig = async function () {
    const conn = await mysql.createConnection(setting);
    let sqlquery = "SELECT * FROM api-tenant WHERE "
    let x = (await conn.execute(sqlquery));
    conn.close()
    return x[0][0];
}


function paginator(items, page, per_page) {
     page = page || 1;
        per_page = per_page || 10;

    let offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
