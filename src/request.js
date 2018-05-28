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
    return (url).replace(/[^(https?:)]\/\//ig, '\/').replace(/\/\??$/, '');
}
exports.buildUrl = buildUrl;
function doRequest(_options) {
    return new Promise(function (resolve, reject) {
        var _a = _options.url, url = _a === void 0 ? '' : _a, method = _options.method, _body = _options.body, _b = _options.headers, headers = _b === void 0 ? {} : _b, onRequest = _options.onRequest, onResponse = _options.onResponse, _c = _options.mode, mode = _c === void 0 ? 'no-cors' : _c, _d = _options.isFetch, isFetch = _d === void 0 ? true : _d;
        method = method.toUpperCase();
        url = buildUrl(url);
        var body = {};
        //参数请求前处理
        if (onRequest) {
            _body = onRequest(_body);
        }
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (method == 'GET') {
            var str = params2String(_body || {});
            if (/[&?]\w+=\sw$/.test(url)) {
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
        if ('fetch' in window && isFetch) {
            console.log(url, __assign({ method: _options.method, headers: headers,
                mode: mode }, method == 'GET' ? { body: body } : {}));
            fetch(encodeURI(url), __assign({ method: _options.method, headers: headers,
                mode: mode }, method == 'GET' ? { body: body } : {})).then(function (res) {
                if (onResponse) {
                    res = onResponse(res);
                }
                resolve(res);
            })["catch"](function (err) {
                reject(err);
            });
        }
        else {
            var xmlHttp_1;
            //IE7以上
            if ('XMLHttpRequest' in window) {
                xmlHttp_1 = new XMLHttpRequest();
            }
            else {
                xmlHttp_1 = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlHttp_1.onreadystatechange = function () {
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
                    var res = new Response(xmlHttp_1.responseText, {
                        headers: headers_1
                    });
                    resolve(res);
                }
                catch (err) {
                    reject(err);
                }
            };
            xmlHttp_1.open(method, encodeURI(url), true);
            xmlHttp_1.send(method == 'GET' ? body : null);
        }
    });
}
exports.doRequest = doRequest;
var CRequest = /** @class */ (function () {
    function CRequest(_options) {
        this._options = _options;
    }
    CRequest.prototype.request = function () {
        return this.doFetch();
    };
    CRequest.prototype.doFetch = function () {
        return new Promise(function (resolve, reject) {
        });
    };
    CRequest.prototype.doXmlHttpRequest = function () {
        return new Promise(function (resolve, reject) {
        });
    };
    return CRequest;
}());
exports["default"] = CRequest;
