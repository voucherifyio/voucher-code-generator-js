## Coupon Code Generator

Generate unique, random, and hard to guess coupon / voucher codes.
Use cases: promo codes, loyalty coupons, gift vouchers, in-app purchases, referral links

This library originates from [Voucherify](https://www.voucherify.io/?utm_source=github&utm_medium=repo&utm_campaign=opensource).

![https://www.voucherify.io/?utm_source=github&utm_medium=repo&utm_campaign=opensource](https://github.com/voucherifyio/voucherify-java-sdk/raw/master/voucherify-java-sdk.png)

Voucherify - programmable building blocks for coupon, referral, and loyalty programs.

Our developer friendly, API-first platform helps developers integrate digital promotions across any marketing channel or customer touchpoint - eventually giving full control over campaigns back to the marketing team. 

Why Voucherify?
* RESTful API with pre-built **client libraries** and comprehensive documentation
* Configurable **webhooks** allow you to integrate Voucherify with any API service out there
* Get real-time visibility into every change in your system with **monitoring & logs**
* Explore the possibilities with dozens of **working demos** and **test mode**
* **Livechat & Slack** support

See the full documentation - https://docs.voucherify.io

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
    });
catch (e) {
    console.log("Sorry, not possible.");
}
```

#### Sequential code

It is possible to generate a specific code from the pool of all possible codes for a config using a `sequenceOffset` parameter.
The offset must be greater than equal 0, otherwise the first possible combination will be returned.  
The offset must be less than the number of maximum combinations for a config, otherwise the last possible combination will be returned. 
It is possible to generate a series of codes starting from `sequenceOffset` by additionally using `count` config parameter.

```
var sequenceOffset = 52;

voucher_codes.generate({
    count: 3,
    length: 2,
    charset: "0123456789"
}, sequenceOffset);
```

Result: `["52", "53", "54"]`

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
