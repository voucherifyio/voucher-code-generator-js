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

    /*  Example:

        config.charset = "0123456789"
        config.charset.length = 10
        config.pattern = "##"
        config.length = 2

        for first # sign charIndex = 0
        sequenceOffset = 0)   Math.floor(0  / Math.pow(10, 1)) % 10  ->  Math.floor(0  / 10) % 10  ->  0
        sequenceOffset = 2)   Math.floor(2  / Math.pow(10, 1)) % 10  ->  Math.floor(2  / 10) % 10  ->  0
        sequenceOffset = 10)  Math.floor(10 / Math.pow(10, 1)) % 10  ->  Math.floor(10 / 10) % 10  ->  1
        sequenceOffset = 12)  Math.floor(12 / Math.pow(10, 1)) % 10  ->  Math.floor(12 / 10) % 10  ->  1

        for second # sign charIndex = 1
        sequenceOffset = 0)   Math.floor(0  / Math.pow(10, 0)) % 10  ->  Math.floor(0  / 1) % 10   ->  0
        sequenceOffset = 2)   Math.floor(2  / Math.pow(10, 0)) % 10  ->  Math.floor(2  / 1) % 10   ->  2
        sequenceOffset = 10)  Math.floor(10 / Math.pow(10, 0)) % 10  ->  Math.floor(10 / 1) % 10   ->  0
        sequenceOffset = 12)  Math.floor(12 / Math.pow(10, 0)) % 10  ->  Math.floor(12 / 1) % 10   ->  2
    */
    function sequenceElem(config, sequenceOffset, charIndex) {
        return config.unique_charset[Math.floor(sequenceOffset / Math.pow(config.unique_charset.length, config.length - charIndex - 1)) % config.unique_charset.length];
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
        this.unique_charset = uniqueCharset(this.charset);
        this.prefix = config.prefix || "";
        this.postfix = config.postfix || "";
        this.pattern = config.pattern || repeat("#", this.length);

        if (config.pattern) {
            this.length = (config.pattern.match(/#/g) || []).length;
        }
    }

    function uniqueCharset(charset) {
        var map = {};
        var result = [];

        for (var i = 0; i < charset.length; i++) {
            const sign = charset[i];

            if (!map[sign]) {
                result.push(sign);
                map[sign] = true;
            }
        }

        return result.join("");
    }

    function generateOne(config, sequenceOffset) {
        var generateIndex = 0;

        var code = config.pattern.split('').map(function(char) {
            if (char === '#') {
                if (isNaN(sequenceOffset)) {
                    return randomElem(config.charset);
                }
                return sequenceElem(config, sequenceOffset, generateIndex++);
            } else {
                return char;
            }
        }).join('');
        return config.prefix + code + config.postfix;
    }

    function maxCombinationsCount (config) {
        return Math.pow(config.unique_charset.length, config.length);
    }

    function isFeasible(config) {
        return maxCombinationsCount(config) >= config.count;
    }

    function generate(config, sequenceOffset) {
        config = new Config(config);
        var count = config.count;

        if (!isFeasible(config)) {
            throw new Error("Not possible to generate requested number of codes.");
        }

        sequenceOffset = +sequenceOffset;

        if (!isNaN(sequenceOffset)) {
            if (sequenceOffset < 0) {
                sequenceOffset = 0;
            } else if (sequenceOffset >= maxCombinationsCount(config)) {
                sequenceOffset = maxCombinationsCount(config) - 1;
            }
        }

        var map = {};
        var codes = [];

        while (count > 0) {
            var code = generateOne(config, sequenceOffset);

            if (!map[code]) {
                codes.push(code);
                map[code] = true;
                count--;
            }

            sequenceOffset++;
        }

        return codes;
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
