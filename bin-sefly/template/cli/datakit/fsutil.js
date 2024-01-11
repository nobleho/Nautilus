'use strict';
import fs from 'fs';

export function createdFolder(folderName) {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
}


export async function copyFolder(folderName, desName) {
    try {
        if (fs.existsSync(desName)) {
           fs.rmSync(desName);
        }
        fs.mkdirSync("dist");
        fs.mkdirSync(desName);
        fs.cp(folderName, desName, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
            }
        });
    } catch (err) {
        console.error(err);
    }

    
}

export default function readFile(filePath) {
console.log(filePath);
    let content;   
    try {
        content = fs.readFileSync(filePath, 'utf8'); 
    } catch (err) {
        content = fs.readFileSync("../html/404.html.htpl", 'utf8'); 
    }

    return content;
};


export async function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, { flag: 'wx' }, );
    } catch (err) {
        console.error(err);
    }
}

export function writeStreamFile(filePath, content) {

    let writeStream = fs.createWriteStream(filePath);
    writeStream.write(content, 'utf-8');
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    writeStream.end();
}