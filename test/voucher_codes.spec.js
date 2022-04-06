var voucher_codes = require('../voucher_codes.js');

describe('voucher_codes', function(){

    it('should generate code of request length', function(){
        var length = 5;
        var code = voucher_codes.generate({length: length})[0];

        expect(code.length).toBe(length);
    });

    it('should generate code of default length', function(){
        var default_length = 8;
        var code = voucher_codes.generate({})[0];

        expect(code.length).toBe(default_length);
    });

    it('should generate code if no config provided', function(){
        var default_length = 8;
        var code = voucher_codes.generate()[0];

        expect(code.length).toBe(default_length);
    });

    it('should generate 5 unique codes', function(){
        var codes = voucher_codes.generate({
            length: 2,
            count: 5
        });

        expect(codes.length).toBe(5);
        codes.forEach(function(code) {
            expect(code.length).toBe(2);
            expect(codes.indexOf(code)).toBe(codes.lastIndexOf(code)); // check uniqueness
        })
    });

    it('should generate a code consisting of numbers only', function(){
        var numbers = "0123456789";
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var code = voucher_codes.generate({
            length: 10,
            charset: numbers
        })[0];

        expect(code.length).toBe(10);
        code.split('').forEach(function(char) {
            expect(numbers).toContain(char);
            expect(letters).not.toContain(char);
        });
    });

    it('should generate a code consisting of letters only', function(){
        var numbers = "0123456789";
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var code = voucher_codes.generate({
            length: 10,
            charset: letters
        })[0];

        expect(code.length).toBe(10);
        code.split('').forEach(function(char) {
            expect(letters).toContain(char);
            expect(numbers).not.toContain(char);
        });
    });

    it('should generate code with prefix', function(){
        var code = voucher_codes.generate({
            prefix: "promo-"
        })[0];

        expect(code).toMatch(/^promo-/);
    });

    it('should generate code with postfix', function(){
        var code = voucher_codes.generate({
            postfix: "-extra"
        })[0];

        expect(code).toMatch(/-extra$/);
    });

    it('should generate code with prefix and postfix', function(){
        var code = voucher_codes.generate({
            prefix: "promo-",
            postfix: "-extra"
        })[0];

        expect(code).toMatch(/^promo-.*-extra$/);
    });

    it('should generate code from pattern', function(){
        var code = voucher_codes.generate({
            pattern: "##-###-##"
        })[0];

        expect(code).toMatch(/^([0-9a-zA-Z]){2}-([0-9a-zA-Z]){3}-([0-9a-zA-Z]){2}$/);
    });

    it('should detect infeasible config', function(){
        var config = {
            count: 1000,
            charset: "abc",
            length: 5
        }; // there are only 125 (5^3) possible codes for this config

        expect(function() {
            voucher_codes.generate(config);
        }).toThrow("Not possible to generate requested number of codes.");
    });

    it('should detect infeasible config for charset with duplicates', function(){
        var config = {
            count: 2,
            charset: "11",
            length: 2
        }; // there is only 1 possible code for this config

        expect(function() {
            voucher_codes.generate(config);
        }).toThrow("Not possible to generate requested number of codes.");
    });

    it('should generate fixed code', function(){
        var config = {
            count: 1,
            pattern: "FIXED"
        };

        var codes = voucher_codes.generate(config);

        expect(codes.length).toEqual(1);
        expect(codes[0]).toEqual("FIXED");
    });

    it('should generate single sequential codes from numbers charset', function(){
        var config = {
            charset: voucher_codes.charset("numbers"),
            pattern: "A###Z"
        };

        expect((voucher_codes.generate(config, 0)).length).toEqual(1);

        expect((voucher_codes.generate(config, 0))[0]).toEqual("A000Z");
        expect((voucher_codes.generate(config, 1))[0]).toEqual("A001Z");
        expect((voucher_codes.generate(config, 2))[0]).toEqual("A002Z");
        expect((voucher_codes.generate(config, 5))[0]).toEqual("A005Z");
        expect((voucher_codes.generate(config, 9))[0]).toEqual("A009Z");
        expect((voucher_codes.generate(config, 10))[0]).toEqual("A010Z");
        expect((voucher_codes.generate(config, 11))[0]).toEqual("A011Z");
        expect((voucher_codes.generate(config, 99))[0]).toEqual("A099Z");
        expect((voucher_codes.generate(config, 100))[0]).toEqual("A100Z");
        expect((voucher_codes.generate(config, 101))[0]).toEqual("A101Z");
        expect((voucher_codes.generate(config, 101))[0]).toEqual("A101Z");
        expect((voucher_codes.generate(config, 599))[0]).toEqual("A599Z");
        expect((voucher_codes.generate(config, 600))[0]).toEqual("A600Z");
        expect((voucher_codes.generate(config, 601))[0]).toEqual("A601Z");
    });

    it('should generate series of sequential codes from numbers charset', function(){
        var config = {
            charset: voucher_codes.charset("numbers"),
            pattern: "A###Z",
            count: 12
        };

        const codes = voucher_codes.generate(config, 190);

        expect(codes.length).toEqual(12);
        expect(codes).toEqual(["A190Z", "A191Z", "A192Z", "A193Z", "A194Z", "A195Z", "A196Z", "A197Z", "A198Z", "A199Z", "A200Z", "A201Z"]);
    });

    it('should generate first or last code when sequenceOffset is out of range', function(){
        var config = {
            charset: voucher_codes.charset("numbers"),
            pattern: "A##Z"
        };

        expect((voucher_codes.generate(config, -2))[0]).toEqual("A00Z");
        expect((voucher_codes.generate(config, -1))[0]).toEqual("A00Z");
        expect((voucher_codes.generate(config, 0))[0]).toEqual("A00Z");
        expect((voucher_codes.generate(config, 99))[0]).toEqual("A99Z");
        expect((voucher_codes.generate(config, 100))[0]).toEqual("A99Z");
        expect((voucher_codes.generate(config, 101))[0]).toEqual("A99Z");
    });

    it('should generate series of sequential codes from alphabetic charset', function(){
        var config = {
            charset: voucher_codes.charset("alphabetic"),
            pattern: "###",
            prefix: "prefix-",
            postfix: "-postfix"
        };

        expect((voucher_codes.generate(config, 0)).length).toEqual(1);

        expect((voucher_codes.generate(config, 0))[0]).toEqual("prefix-aaa-postfix");
        expect((voucher_codes.generate(config, 1))[0]).toEqual("prefix-aab-postfix");
        expect((voucher_codes.generate(config, 2))[0]).toEqual("prefix-aac-postfix");
        expect((voucher_codes.generate(config, 3))[0]).toEqual("prefix-aad-postfix");
        expect((voucher_codes.generate(config, 4))[0]).toEqual("prefix-aae-postfix");
        expect((voucher_codes.generate(config, 5))[0]).toEqual("prefix-aaf-postfix");
        expect((voucher_codes.generate(config, 15))[0]).toEqual("prefix-aap-postfix");
        expect((voucher_codes.generate(config, 25))[0]).toEqual("prefix-aaz-postfix");
        expect((voucher_codes.generate(config, 26))[0]).toEqual("prefix-aaA-postfix");
        expect((voucher_codes.generate(config, 51))[0]).toEqual("prefix-aaZ-postfix");
        expect((voucher_codes.generate(config, 52))[0]).toEqual("prefix-aba-postfix");
        expect((voucher_codes.generate(config, 103))[0]).toEqual("prefix-abZ-postfix");
        expect((voucher_codes.generate(config, 2703))[0]).toEqual("prefix-aZZ-postfix");
        expect((voucher_codes.generate(config, 2704))[0]).toEqual("prefix-baa-postfix");
        expect((voucher_codes.generate(config, 2705))[0]).toEqual("prefix-bab-postfix");
    });

    it('should generate series of sequential codes from charset with duplicates', function(){
        var config = {
            charset: "001",
            pattern: "##",
            count: 4
        };

        const codes = voucher_codes.generate(config, 0);

        expect(codes.length).toEqual(4);
        expect(codes).toEqual(["00", "01", "10", "11"]);
    });

});