#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { contentData } from "./data/data.js";
import readFile, { copyFolder, writeFile } from "./datakit/fsutil.js";

yargs(hideBin(process.argv))
  .command(
    "list",
    "List all commands",
    () => {
      console.info(
        "List commands: \n vurl <url> : Fetch the contents of the URL to view \n list : List all commands \n --help : Help \n --version : Version \n"
      );
    },
    () => { }
  )
  .command(
    "vurl <url>",
    "fetch the contents of the URL to view",
    () => { },
    (args) => {
      console.info(args);
    }
  )
  .command(
    "add <filename>",
    "Add new function",
    () => { },
    (args) => {
      functions(args);
    }
  )
  .command(
    "component <componentname>",
    "Add new component",
    () => { },
    (args) => {
      newComponent(args);
    }
  )
  .command(
    "init <application>",
    "Init new application",
    () => { },
    (args) => {
      newProject(args);
    }
  )
  .command(
    "read <filename>",
    "read JSON",
    () => { },
    (args) => {
      readjson(args);
    }
  )
  .command(
    "scan <projectDir>",
    "read JSON",
    () => { },
    (args) => {

    }
  )
  .command(
    "import <projectDir>",
    "read JSON",
    () => { },
    (args) => {
      loadProject(args.projectDir);
    }
  )
  .demandCommand(1)
  .parse();

function functions(args) {
  console.info(args);
}

function readjson(args) {
  console.info(args.filename);
  let obj;

  fs.readFile("./json/" + args.filename, "utf8", function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.info(obj);
  });
}

function newComponent(args) {
  console.info(args.componentname);
  let router = args.componentname;
  let data = readFile("./app/html/root.htpl");
  let result = data;
  contentData.forEach((element) => {
    result = result.replaceAll(element.var, element.val);
  });

  writeFile("./dist/app/html" + router + ".html", result);
}

async function newProject(args) {
  console.info(args.application);
  let router = args.application;
  await copyFolder('./app','./dist/' + router);
  
  let result = readFile("./html/root.htpl");
  contentData.forEach((element) => {
    result = result.replaceAll(element.var, element.val);
  });
  await writeFile("./dist/" + router + "/app/html/index.html", result);

  let ht404 = readFile("./html/404.htpl");
  contentData.forEach((element) => {
    ht404 = ht404.replaceAll(element.var, element.val);
  });

  await writeFile("./dist/" + router + "/app/html/404.html", ht404);
}