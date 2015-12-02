var voucher_codes = require('../voucher_codes.js');

describe('voucher_codes', function(){

    it('should generate code of request length', function(){
        var length = 5;
        var code = voucher_codes.generate({length: length});

        expect(code.length).toBe(length);
    });

    it('should generate code of default length', function(){
        var default_length = 8;
        var code = voucher_codes.generate({});

        expect(code.length).toBe(default_length);
    })

});