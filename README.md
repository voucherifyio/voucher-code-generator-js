## Voucher Code Generator

Generate unique, hard to guess coupon codes.

This library originates from [Voucherify](http://www.voucherify.io/?utm_source=inbound&utm_medium=github&utm_campaign=js-voucher-code-generator-beta).

### Usage

Install with npm:

```
$ npm install --save voucher-code-generator
```

Include with require:
```
var voucher_codes = require('voucher-code-generator');
```

Generate codes of requested length:
```
voucher_codes.generate({
    length: 8
});
```

Sample result: `B5xdYJn1`
