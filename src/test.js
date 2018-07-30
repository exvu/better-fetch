"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("./index"));
var admin = new index_1["default"]("api", {
    baseUrl: "http://exvu.vip//1",
    onRequest: function (req, data) {
        req.headers.set("afasdf", "1");
        // req.body.append("a","1")
        console.log(req, data);
        //上传token
    },
    onResponse: function (res) {
        //保存token
    }
});
admin.get('/', {
    a: 1
}, {
    headers: {
        "a": 1111
    }
});
//输出querystring
// console.log(admin.querystring("/11"))
// console.log(object2query({
//     a: 1,
//     b:[1,2],
//     c:{
//         a:1,
//         b:[1,3]
//     }
// }))
// admin.post('/admin/v1/', {
//     a: 1,
//     b: 2
// }, {
//         headers: {
//             'confetn': 'fasdfasf',
//         }
//     });
