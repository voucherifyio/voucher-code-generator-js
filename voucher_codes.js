/**
 * Copyright 2015 rspective (http://rspective.com)
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

    function Config(config) {
        config = config || {};
        this.count = config.count || 1;
        this.length = config.length || 8;
        this.charset = config.charset || charset("alphanumeric");
        this.prefix = config.prefix || "";
        this.postfix = config.postfix || "";
        this.pattern = config.pattern || repeat("#", this.length);
    }

    function generateOne(config) {
        var code = config.pattern.split('').map(function(char) {
            if (char === '#') {
                return randomElem(config.charset);
            } else {
                return char;
            }
        }).join('');
        return config.prefix + code + config.postfix;
    }

    function isFeasible(charset, pattern, count) {
        return Math.pow(charset.length, (pattern.match(/#/g) || []).length) >= count;
    }

    function generate(config) {
        config = new Config(config);
        var count = config.count;
        if (!isFeasible(config.charset, config.pattern, config.count)) {
            throw new Error("Not possible to generate requested number of codes.");
        }

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