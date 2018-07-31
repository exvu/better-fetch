"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = __importDefault(require("../lib/index"));
//创建一个api实例
var admin = new index_1["default"]("api", {
    //基地址
    baseUrl: "http://exvu.vip//1",
    //请求前数据处理
    onRequest: function (req) {
        //设置请求头
        req.headers.set("afasdf", "1");
        //修改请求数据
        req.data = { a: 1 };
    },
    //
    onResponse: function (res) {
        //获取请求头
        res.headers.get("access-token");
        //必须返回数据,then方法会接收
        return res;
    }
});
/**
 * 发起请求
 * 第一个参数 url 请求地址(会自动检查并加上baseUrl)
 * 第二个参数 data 请求数据
 * 第三个参数 options 包含 headers,onRequest,onResponse(两个方法会覆盖配置的参数)
 * return 返回promise<Response>
 */
admin.get('/', { a: 1 }, {
    headers: {
        "a": 1111
    },
    //获取xmlhttprequest对象,用于终止请求,上传进度
    xhr: function (xhr) {
    }
}).then();
//请求的url
admin.querystring("/11");
//将数据装换为query
index_1.object2query({
    a: 1,
    b: [1, 2],
    c: {
        a: 1,
        b: [1, 3]
    }
});
