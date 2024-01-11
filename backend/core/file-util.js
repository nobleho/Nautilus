const fs = require('node:fs');

function createdFolder( folderName){
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
}

function readFile(filePath){
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        return '';
    }
}

exports.writeFile = function (filePath, content){
    try {
        fs.writeFileSync(filePath, content);
    } catch (err) {
        console.error(err);
    }
}

exports.writeStreamFile = function (filePath, content) {
  //  console.log(content);
    let writeStream = fs.createWriteStream(filePath);

// write some data with a base64 encoding
    writeStream.write(content, 'utf-8');

// the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });

// close the stream
    writeStream.end();
}