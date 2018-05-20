"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var fetch_1 = require("./fetch");
var CFetch = /** @class */ (function () {
    function CFetch() {
    }
    /**
     * 根据指定的key获取实例
     */
    CFetch.getInstance = function (key) {
        return this.instances[key] || null;
    };
    /**
     *
     * 创建实例
     */
    CFetch.create = function (key, options) {
        this.instances[key] = new Fetch(options);
        return this.instances[key];
    };
    /**
     * 实例数组  可以有多个fetch对象
     */
    CFetch.instances = {};
    return CFetch;
}());
exports["default"] = CFetch;
var Fetch = /** @class */ (function () {
    function Fetch(options) {
        this._url = options.url;
        this._requestCallBack = options.request;
        this._responseCallBack = options.response;
    }
    Fetch.prototype._request = function (options) {
        return function (data) {
            return fetch_1.doRequest(__assign({}, options, { body: data }));
        };
    };
    Fetch.prototype.get = function (url) {
        return this._request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.post = function (url) {
        return this._request({
            url: url,
            method: 'post'
        });
    };
    Fetch.prototype["delete"] = function (url) {
        return this._request({
            url: url,
            method: 'delete'
        });
    };
    Fetch.prototype.patch = function (url) {
        return this._request({
            url: url,
            method: 'patch'
        });
    };
    Fetch.prototype.put = function (url) {
        return this._request({
            url: url,
            method: 'put'
        });
    };
    Fetch.prototype.upload = function (url, options) {
        return this._request({
            url: url,
            method: options.method,
            type: 'upload'
        });
    };
    Fetch.prototype.download = function (url, options) {
        return this._request({
            url: url,
            method: options.method,
            type: "download"
        });
    };
    Fetch.prototype.request = function (options) {
        return this._request(options);
    };
    return Fetch;
}());
function upload(_a, callback) {
    var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, options = __rest(_a, ["url", "method"]);
    return fetch_1.doRequest(__assign({ url: url,
        method: method }, options, { type: 'upload', callback: callback }));
}
exports.upload = upload;
function download(_a, callback) {
    var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'GET' : _c, options = __rest(_a, ["url", "method"]);
    return fetch_1.doRequest(__assign({ url: url,
        method: method }, options, { type: 'download', callback: callback }));
}
exports.download = download;
function request(_a) {
    var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'GET' : _c, options = __rest(_a, ["url", "method"]);
    return fetch_1.doRequest(__assign({}, options, { url: url,
        method: method }));
}
exports.request = request;
