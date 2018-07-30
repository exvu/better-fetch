"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var charm_request_1 = require("./charm-request");
var Api = /** @class */ (function () {
    /**
     *
     * @param key 实例唯一键
     * @param _options 配置参数 createOption
     */
    function Api(key, _options) {
        this._options = _options;
        Api._instances[key] = this;
    }
    /**
     * 获取实例
     * @param key 实例唯一键
     */
    Api.getInstance = function (key) {
        return Api._instances[key];
    };
    /**
     * 删除实例 实例唯一键
     * @param key
     */
    Api.removeInstance = function (key) {
        delete Api._instances[key];
    };
    /**
     * 拼接url,当url以http|https开头的不拼接baseUrl
     * @param url url
     */
    Api.prototype.joinUrl = function (url) {
        if (/^(https?:)?\/\//.test(url)) {
            return this.build(url);
        }
        //去除多余的/ 保留一个即可
        return this.build(this._options.baseUrl + url);
    };
    Api.prototype.build = function (url) {
        return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\//, "\/");
    };
    /**
     * 获取请求的url
     * @param body
     */
    Api.prototype.querystring = function (url) {
        return this.joinUrl(url);
    };
    Api.prototype.get = function (url, data, options) {
        if (data === void 0) { data = ''; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'get', __assign({}, options, { data: data }));
    };
    Api.prototype.post = function (url, data, options) {
        if (data === void 0) { data = ''; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'post', __assign({}, options, { data: data }));
    };
    Api.prototype["delete"] = function (url, data, options) {
        if (data === void 0) { data = ''; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'delete', __assign({}, options, { data: data }));
    };
    Api.prototype.put = function (url, data, options) {
        if (data === void 0) { data = ''; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'put', __assign({}, options, { data: data }));
    };
    Api.prototype.patch = function (url, data, options) {
        if (data === void 0) { data = ''; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'patch', __assign({}, options, { data: data }));
    };
    Api.prototype._request = function (url, method, options) {
        return charm_request_1.doRequest(this.joinUrl(url), __assign({}, this._options, options, { 
            //合并header
            headers: __assign({}, this._options.headers, options.headers), method: method }));
    };
    /**
     * 实例容器
     */
    Api._instances = {};
    return Api;
}());
exports["default"] = Api;
