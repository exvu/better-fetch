"use strict";
exports.__esModule = true;
var request_1 = require("./request");
// console.log(params2FormData({
//     a: 1,
//     b: {
//         a: {
//             c: [1, 2, 3],
//             d: 1
//         },
//         b: 2
//     },
//     c: [1, 3, 4, 5]
// }))
console.log(request_1.buildUrl('https://www.baidu.com'));
console.log(request_1.buildUrl('https://www.baidu.com/'));
console.log(request_1.buildUrl('www.baidu.com/?'));
console.log(request_1.buildUrl('//www.baidu.com'));
console.log(request_1.buildUrl('https://www.baidu.com/?a=1'));
