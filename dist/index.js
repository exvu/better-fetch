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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = CFetch;
var Fetch = /** @class */ (function () {
    function Fetch(options) {
        this._url = options.url;
        this._requestCallBack = options.request;
        this._responseCallBack = options.response;
    }
    Fetch.prototype.get = function (url) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.post = function (url) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.delete = function (url) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.patch = function (url) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.put = function (url) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.upload = function (url, callback) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.down = function (url, callback) {
        return request({
            url: url,
            method: 'get'
        });
    };
    Fetch.prototype.request = function (options) {
        return request(__assign({}, options, { method: 'get' }));
    };
    return Fetch;
}());
function request(_a) {
    var url = _a.url, method = _a.method, options = __rest(_a, ["url", "method"]);
    return new Promise(function (resolve, reject) {
        //存在fetch就是使用fetch 
        if ('fetch' in window) {
            fetch(url, __assign({ method: method }, options)).then(function (res) { return resolve(res.body); }).catch(function (err) {
                reject(err);
            });
        }
        else {
        }
    });
}
