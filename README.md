## Coupon Code Generator

Generate unique, hard to guess coupon, voucher codes.

Use cases: promo codes, loyalty coupons, gift vouchers, in-app purchases

This library originates from [Voucherify](http://www.voucherify.io/?utm_source=github&utm_medium=opensource&utm_campaign=acq).

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

#### Prefix and Postfix

You can optionally surround each generated code with a prefix and/or postfix.
 
For instance:
```
voucher_codes.generate({
    prefix: "promo-",
    postfix: "-2015"
});
```

Result: `["promo-WZ4x1t3U-2015"]`

#### Pattern

Codes may follow a specified pattern. Use hash (`#`) as a placeholder for random characters. 
Notice that if `pattern` is specified then `length` is ignored.

Example:

```
voucher_codes.generate({
    pattern: "##-###-##",
});
```

Result: `["P7-ofW-Ka"]`

#### Infeasible configs

There exist some configs that are not feasible. For example it's not possible to generate 1000 codes if you want
your codes to be 2 characters long and consisting only of numbers. Voucher code generator detects such cases and
throws an error `"Not possible to generate requested number of codes."`.

```
try {
    voucher_codes.generate({
        count: 1000,
        length: 2,
        charset: "0123456789"
    })
catch (e) {
    console.log("Sorry, not possible.");
}
```

#### Config reference

| attribute        | default value  | description                                                                     |
|------------------|:--------------:|---------------------------------------------------------------------------------|
| `length`         | `8`            | Number of characters in a generated code (excluding prefix and postfix)         |
| `count`          | `1`            | Number of codes generated.                                                      |
| `charset`        | `alphanumeric` | Characters that can appear in the code.                                         |
| `prefix`         | `""`           | A text appended before the code.                                                |
| `postfix`        | `""`           | A text appended after the code.                                                 |
| `pattern`        | `"########"`   | A pattern for codes where hashes (`#`) will be replaced with random characters. |


### Testing

Install dependencies:

```
npm install
```

Run tests:

```
npm run test
```

### License

Code released under the [MIT license](LICENSE).
