## Voucher Code Generator

Generate unique, hard to guess coupon, voucher codes.

This library originates from [Voucherify](http://www.voucherify.io/?utm_source=inbound&utm_medium=github&utm_campaign=js-voucher-code-generator-beta).

### Installation

#### In Node.js

Install with npm:

```
$ npm install --save voucher-code-generator
```

Include with require:

```
var voucher_codes = require('voucher-code-generator');
```

#### In a browser

```
<script src="voucher_codes.js"></script>
```

### Usage

Generate 5 codes, each 8 characters long:
```
voucher_codes.generate({
    length: 8,
    count: 5
});
```

Sample result: `["FR6bwx1q", "ByamOdWV", "7roFwfQs", "rmWlwvll", "pgih5eAB"]`

#### Charset

Default charset is alphanumeric (numbers and letters). However, you can specify your own charset:

```
voucher_codes.generate({
    length: 6,
    count: 3,
    charset: "0123456789"
});
```

Sample result: `["386525", "676442", "019075"]`

You can also use one of the predefined charsets by calling `voucher_codes.charset(name)`.

| name             | charset                                                            |
|------------------|--------------------------------------------------------------------|
| `"numbers"`      | `"0123456789"`                                                     |
| `"alphabetic"`   | `"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"`           |
| `"alphanumeric"` | `"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"` |

For example:

```
voucher_codes.generate({
    length: 5,
    count: 4,
    charset: voucher_codes.charset("alphabetic")
});
```

Result: `["odghy", "kZEYc", "eOTCl", "wVCzD"]`

### Testing

Install dependencies:

```
npm install
```

Run tests:

```
npm run test
```