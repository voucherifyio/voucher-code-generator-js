"use strict";

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElem(arr) {
    return arr[randomInt(0, arr.length-1)];
}

function generateOne(config) {
    var length = config.length || 8;
    var charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var code = "";
    for (var i = 0; i < length; i++) {
        code += randomElem(charset);
    }
    return code;
}

function generate(config) {
    var count = config.count || 1;
    var codes = {};
    while (count > 0) {
        var code =  generateOne(config);
        if (codes[code] === undefined) {
            codes[code] = true;
            count--;
        }
    }
    return Object.keys(codes);
}

module.exports = {
    generate: generate
};
