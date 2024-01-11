// @ts-ignore
const { t }= require("typy");

exports.isObject = (v) => {
    return t(v).isObject && !isDate(v);
}

exports.isFunction = (v) => {
    return t(v).isFunction;
}

exports.isString = (v) => {
    return t(v).isString;
}

exports.isDate = (v) => {
    return Object.prototype.toString.call(v) === "[object Date]";
}

exports.isBoolean = (v) => {
    return t(v).isBoolean;
}

exports.isNumber = (v) => {
    return t(v).isNumber;
}

exports.isArray = (v) =>{
    return t(v).isArray;
}

exports.isUndefined = (v) => {
    return v === undefined;
}

exports.determineFormat = (fileName) => {
    if (fileName.endsWith(".json")) {
        return "JSON";
    }
    else if (fileName.endsWith(".csv")) {
        return "CSV";
    }
    else if (fileName.endsWith(".tsv")) {
        return "TSV";
    }
    else if (fileName.endsWith(".yaml")) {
        return "YAML";
    }
    else if (fileName.endsWith(".yml")) {
        return "YAML";
    }
    else {
        throw new Error(`Failed to ext file name: "${fileName}"`);
    }
}