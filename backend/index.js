const http = require('http');
let url = require('url');
const api = require('./core/constant.js');
const controller = require('./core/api.js');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer(async (req, res) => {

    res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
    let q = url.parse(req.url, true);
    let [rest] =[];
    switch (q.pathname) {
        case '/getAllStatus' :
            [rest] = await Promise.all([controller.getApi('status', '')]);
            if (rest !== undefined) {
                res.write(JSON.stringify(rest));
            } else
                res.write('{}');
            break;
        case '/getAllBook' :
            rest = await controller.getApi('book','');
            if (rest !== undefined) {
                res.write(JSON.stringify(rest));
            } else
                res.write('{}');
            break;
        default:

    }

    res.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});