'use strict';
const express = require('express');
const app = express();
const fsu = require('../src/datakit/fsutil.js')
const contentData = require('../src/data/data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/asset", express.static("asset"));
app.use('/static', express.static(__dirname + 'public'));

app.get('/:route', async function (req, res) {
  let result = "";
  let router = req.params.route || "index";
  let data = fsu.readFile("./app/html/" + router + ".html");
  result = data;
  contentData.forEach(element => {
    result = result.replaceAll(element.var, element.val)
  })
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(result);
  return res.end();
});

app.get('/', function (req, res) {
  let result = "";
  let router = "index";
  let data = fsu.readFile("./app/html/" + router + ".html");
  result = data;
  contentData.forEach(element => {
    result = result.replaceAll(element.var, element.val)
  })
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(result);
  return res.end();
});

app.listen(8584, '0.0.0.0', () => console.log(`Server is listening on port 8484`))

