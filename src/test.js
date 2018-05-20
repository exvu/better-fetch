"use strict";
exports.__esModule = true;
var fetch_1 = require("./fetch");
console.log(fetch_1.paramstoQuery(fetch_1.parseParams({
    a: 1,
    b: {
        a: {
            c: [1, 2, 3],
            d: 1
        },
        b: 2
    }
})));
