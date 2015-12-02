## Voucher Code Generator

Generate unique, hard to guess coupon, voucher codes.

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

Generate 5 codes, each 8 characters long:
```
voucher_codes.generate({
    length: 8,
    count: 5
});
```

Sample result: `['FR6bwx1q', 'ByamOdWV', '7roFwfQs', 'rmWlwvll', 'pgih5eAB']`


### Testing

Install dependencies:

```
npm install
```

Run tests:

```
npm run test
```