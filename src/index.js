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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("./request"));
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
     * 创建实例 存在实例就会删除实例再重新创建实例
     */
    CFetch.create = function (key, options) {
        this.instances[key] = new Fetch(options);
        return this.instances[key];
    };
    CFetch.upload = function (_a, callback) {
        var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, options = __rest(_a, ["url", "method"]);
        return new request_1["default"](__assign({}, options, { method: method, type: 'upload', url: url,
            callback: callback, isFetch: false })).request();
    };
    CFetch.download = function (_a, callback) {
        var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'GET' : _c, options = __rest(_a, ["url", "method"]);
        return new request_1["default"](__assign({}, options, { url: url,
            method: method, type: 'download', callback: callback, isFetch: false })).request();
    };
    CFetch.querystring = function (options) {
        return new request_1["default"](__assign({}, options, { method: 'GET' })).querystring();
    };
    CFetch.request = function (_a) {
        var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.method, method = _c === void 0 ? 'GET' : _c, options = __rest(_a, ["url", "method"]);
        return new request_1["default"](__assign({}, options, { url: url,
            method: method, type: 'request' })).request();
    };
    /**
    * 实例数组  可以有多个fetch对象
    */
    CFetch.instances = {};
    return CFetch;
}());
exports["default"] = CFetch;
var Fetch = /** @class */ (function () {
    //将参数保存到私有的属性中
    function Fetch(_options) {
        this._options = _options;
    }
    Fetch.prototype.joinUrl = function (url) {
        if (/^(https?:)?\/\//.test(url)) {
            return url;
        }
        //去除多余的/ 保留一个即可
        return this._options.url + url;
    };
    //请求数据
    Fetch.prototype._request = function (options) {
        var _this = this;
        return function (data, callback) {
            return new request_1["default"](__assign({}, _this._options, options, { type: "request", body: data, callback: callback })).request();
        };
    };
    Fetch.prototype.querystring = function (body) {
        return new request_1["default"](__assign({}, this._options, { method: 'GET', body: body })).querystring();
    };
    Fetch.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'get' }));
    };
    Fetch.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        return this._request(__assign({}, options, { method: 'post', url: this.joinUrl(url) }));
    };
    Fetch.prototype["delete"] = function (url, options) {
        if (options === void 0) { options = {}; }
        return this._request(__assign({}, options, { method: 'delete', url: this.joinUrl(url) }));
    };
    Fetch.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'patch' }));
    };
    Fetch.prototype.put = function (url, options) {
        if (options === void 0) { options = {}; }
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'put' }));
    };
    Fetch.prototype.upload = function (url, options) {
        if (options === void 0) { options = { method: 'POST' }; }
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: options.method || 'POST', type: 'upload', isFetch: false }));
    };
    Fetch.prototype.download = function (url, options) {
        if (options === void 0) { options = { method: 'POST' }; }
        return this._request(__assign({}, options, { method: options.method || 'POST', type: "download", url: this.joinUrl(url), isFetch: false }));
    };
    Fetch.prototype.request = function (options) {
        return this._request(__assign({}, options, { type: "request" }));
    };
    return Fetch;
}());
