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
    })

});