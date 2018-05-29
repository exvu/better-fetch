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
/**
 *
 * 解析参数，
 * 将对象转换成obj[a]的形式
 * 将数组转换成obj[]的形式
 */
function parseParams(_data, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var data = [];
    for (var key in _data) {
        if (_data[key] == undefined) {
            continue;
        }
        var _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data.push.apply(data, parseParams(_data[key], _key));
        }
        else if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (var _i = 0, _a = _data[key]; _i < _a.length; _i++) {
                var v = _a[_i];
                data.push([_key + '[]', v]);
            }
        }
        else {
            data.push([_key, _data[key]]);
        }
    }
    return data;
}
/**
 * 将参数转换为string
 */
function params2String(_data) {
    var data = parseParams(_data);
    return data.map(function (item) { return item.join('='); }).join('&');
}
exports.params2String = params2String;
/**
 * 将参数转换为formdata
 */
function params2FormData(_data) {
    var data = parseParams(_data);
    var formData = new FormData();
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var value = data_1[_i];
        formData.append(value[0], value[1]);
    }
    return formData;
}
exports.params2FormData = params2FormData;
function buildUrl(url) {
    return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\??$/, '\/');
}
exports.buildUrl = buildUrl;
var CRequest = /** @class */ (function () {
    /**
     *
     * @param _options 处理数据
     */
    function CRequest(_options) {
        var _a = _options.url, url = _a === void 0 ? '' : _a, method = _options.method, _body = _options.body, _b = _options.headers, headers = _b === void 0 ? {} : _b, onRequest = _options.onRequest, onResponse = _options.onResponse, _c = _options.mode, mode = _c === void 0 ? 'no-cors' : _c, _d = _options.isFetch, isFetch = _d === void 0 ? true : _d, type = _options.type, callback = _options.callback, timeout = _options.timeout;
        method = _options.method.toUpperCase();
        url = buildUrl(url);
        var body = {};
        //参数请求前处理
        if (onRequest) {
            _body = onRequest(_body || {});
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (method == 'GET') {
            var str = params2String(_body || {});
            if (/[&?][\w-]+=[\w-]+$/.test(url)) {
                url += '&' + str;
            }
            else {
                url += '?' + str;
            }
        }
        else {
            //数据存在 并且长度大于0
            if (_body && Object.prototype.toString.call(_body) === '[object Object]' && Object.keys(_body).length > 0) {
                switch (headers['Content-Type']) {
                    case 'multipart/form-data':
                        //转换数据
                        body = params2FormData(_body);
                        break;
                    case 'text/xml':
                        body = _body;
                        break;
                    case 'application/json':
                        body = JSON.stringify(_body);
                        break;
                    case 'application/x-www-form-urlencoded':
                    default:
                        body = params2String(_body);
                        break;
                }
            }
        }
        this._options = {
            url: encodeURI(url), method: method, headers: headers, body: body, mode: mode, isFetch: isFetch, callback: callback, timeout: timeout, type: type, onRequest: onRequest, onResponse: onResponse
        };
        this._options = this.objectFilter(this._options, function (key, value) { return value != undefined || value != null; });
    }
    CRequest.prototype.objectFilter = function (obj, callback) {
        var data = {};
        for (var key in obj) {
            if (callback(key, obj[key])) {
                data[key] = obj[key];
            }
        }
        return data;
    };
    CRequest.prototype.querystring = function () {
        return this._options.url;
    };
    CRequest.prototype.request = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var promise = void 0;
                if ('fetch' in window && _this._options.isFetch) {
                    promise = _this.doFetch().then(resolve, reject);
                }
                else {
                    promise = _this.doXmlHttpRequest().then(resolve, reject);
                }
                return promise;
            }
            catch (e) {
                reject(e);
            }
        });
    };
    CRequest.prototype.doFetch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var _a = _this._options, _b = _a.url, url = _b === void 0 ? '' : _b, method = _a.method, body = _a.body, _c = _a.headers, headers = _c === void 0 ? {} : _c, onResponse_1 = _a.onResponse, _d = _a.mode, mode = _d === void 0 ? 'no-cors' : _d, _e = _a.isFetch, isFetch = _e === void 0 ? true : _e, type = _a.type, callback = _a.callback, timeout = _a.timeout;
                if (type != "request") {
                    reject("fetch not suppert " + type);
                }
                var timeoutId_1;
                if (timeout) {
                    timeoutId_1 = setTimeout(function () {
                        reject(new Error("fetch timeout"));
                    }, timeout);
                }
                var _fetch = fetch(url, __assign({ method: method, headers: headers,
                    mode: mode }, method == 'GET' ? { body: body } : {})).then(function (res) {
                    clearTimeout(timeoutId_1);
                    if (res.status >= 200 && res.status < 300) {
                        return res;
                    }
                    var error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }).then(function (res) {
                    if (onResponse_1) {
                        return onResponse_1(res);
                    }
                    else {
                        return res;
                    }
                }).then(function (res) { return resolve(res); })["catch"](function (err) {
                    clearTimeout(timeoutId_1);
                    reject(err);
                });
                // _fetch.abort = () => {
                //     reject(new Error("fetch abort"))
                // };
                // return _fetch;
            }
            catch (e) {
                reject(e);
            }
        });
    };
    CRequest.prototype.doXmlHttpRequest = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var _a = _this._options, _b = _a.url, url = _b === void 0 ? '' : _b, method = _a.method, body = _a.body, _c = _a.headers, headers = _c === void 0 ? {} : _c, onResponse_2 = _a.onResponse, _d = _a.mode, mode = _d === void 0 ? 'no-cors' : _d, _e = _a.isFetch, isFetch = _e === void 0 ? true : _e, type = _a.type, callback_1 = _a.callback, timeout = _a.timeout;
                var xmlHttp_1;
                //IE7以上
                if ('XMLHttpRequest' in window) {
                    xmlHttp_1 = new XMLHttpRequest();
                }
                else {
                    xmlHttp_1 = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (timeout) {
                    xmlHttp_1.timeout = timeout;
                }
                // Promise.abort = () => {
                //     xmlHttp.abort();
                //     reject(new Error("fetch abort"))
                // };
                xmlHttp_1.open(method, url, true);
                switch (type) {
                    case 'upload':
                        if (Object.prototype.toString.call(callback_1) == '[object Object]') {
                            reject("callback must object");
                        }
                        callback_1.progress && (xmlHttp_1.upload.onprogress = function (event) {
                            callback_1.progress(event.loaded, event.total);
                        });
                        callback_1.loadstart && (xmlHttp_1.upload.onloadstart = callback_1.loadstart);
                        callback_1.loadend && (xmlHttp_1.upload.onloadend = callback_1.loadend);
                        callback_1.error && (xmlHttp_1.upload.onerror = callback_1.error);
                        callback_1.timeout && (xmlHttp_1.upload.ontimeout = callback_1.timeout);
                        callback_1.abort && (xmlHttp_1.upload.onabort = callback_1.abort);
                        callback_1.load && (xmlHttp_1.upload.onload = callback_1.load);
                        break;
                    case 'download':
                        xmlHttp_1.onprogress = function (event) {
                            callback_1(event.loaded, event.total);
                        };
                        xmlHttp_1.responseType = 'blob';
                        break;
                    default:
                        break;
                }
                xmlHttp_1.onload = function () {
                    try {
                        if (xmlHttp_1.readyState != 4) {
                            return;
                        }
                        var headers_1 = {};
                        xmlHttp_1.getAllResponseHeaders().split('\n').forEach(function (item) {
                            var index = item.indexOf(':');
                            if (index != -1) {
                                headers_1[item.substring(0, index)] = item.substr(index + 1).trim();
                            }
                        });
                        var res = new Response(xmlHttp_1.response, {
                            headers: headers_1
                        });
                        resolve(onResponse_2(res));
                    }
                    catch (err) {
                        reject(err);
                    }
                };
                xmlHttp_1.onerror = function (err) {
                    reject(err);
                };
                xmlHttp_1.send(method != 'GET' ? body : null);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return CRequest;
}());
exports["default"] = CRequest;
