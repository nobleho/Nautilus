'use strict';
const fs = require('fs');
const { isString } = require('./validation.js')

exports.createdFolder = (folderName) => {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
}

exports.readFile = (filePath) => {

    let content;   
    try {
        content = fs.readFileSync(filePath, 'utf8'); 
    } catch (err) {
        content = fs.readFileSync("../html/404.html", 'utf8'); 
    }

    return content;
};


exports.writeFile = (filePath, content) => {
    try {
        fs.writeFileSync(filePath, content);
    } catch (err) {
        console.error(err);
    }
}

exports.writeStreamFile = (filePath, content) => {

    let writeStream = fs.createWriteStream(filePath);
    writeStream.write(content, 'utf-8');
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    writeStream.end();
}