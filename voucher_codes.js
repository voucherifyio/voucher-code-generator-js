;(function() {
    "use strict";

    var root = this;

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomElem(arr) {
        return arr[randomInt(0, arr.length - 1)];
    }

    function charset(name) {
        var charsets = {
            numbers: "0123456789",
            alphabetic: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            alphanumeric: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };
        return charsets[name];
    }

    function repeat(str, count) {
        var res = "";
        for (var i = 0; i < count; i++) {
            res += str;
        }
        return res;
    }

    function generateOne(config) {
        var length = config.length || 8;
        var chars = config.charset || charset("alphanumeric");
        var prefix = config.prefix || "";
        var postfix = config.postfix || "";
        var pattern = config.pattern || repeat("#", length);
        var code = pattern.split('').map(function(char) {
            if (char === '#') {
                return randomElem(chars);
            } else {
                return char;
            }
        }).join('');
        return prefix + code + postfix;
    }

    function generate(config) {
        config = config || {};
        var count = config.count || 1;
        var codes = {};
        while (count > 0) {
            var code = generateOne(config);
            if (codes[code] === undefined) {
                codes[code] = true;
                count--;
            }
        }
        return Object.keys(codes);
    }

    var voucher_codes = {
        generate: generate,
        charset: charset
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = voucher_codes;
        }
        exports = voucher_codes;
    } else {
        root.voucher_codes = voucher_codes;
    }
}).call(this);