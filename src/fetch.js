"use strict";
exports.__esModule = true;
/**
 *
 * 解析参数，
 * 将对象转换成obj[a]的形式
 * 将数组转换成obj[]的形式
 */
function parseParams(_data, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var data = {};
    for (var key in _data) {
        var _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data = Object.assign({}, data, parseParams(_data[key], _key));
        }
        else {
            data[_key] = _data[key];
        }
    }
    return data;
}
exports.parseParams = parseParams;
/**
 * 将参数转换为string
 */
function paramstoQuery(_data) {
    var querystring = [];
    for (var key in _data) {
        if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (var _i = 0, _a = _data[key]; _i < _a.length; _i++) {
                var value = _a[_i];
                querystring.push(key + '[]=' + value);
            }
        }
        else {
            querystring.push(key + '=' + _data[key]);
        }
    }
    return querystring.join('&');
}
exports.paramstoQuery = paramstoQuery;
/**
 * 将参数转换为formdata
 */
function paramstoFormData(_data) {
    var formData = new FormData();
    for (var key in _data) {
        if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (var _i = 0, _a = _data[key]; _i < _a.length; _i++) {
                var value = _a[_i];
                formData.append(key + '[]', value);
            }
        }
        else {
            formData.append(key, _data[key]);
        }
    }
    return formData;
}
function parseString2Object(str) {
    if (str === void 0) { str = ''; }
    var data = {};
    str.split('&').forEach(function (item) {
        var index = item.indexOf('=');
        if (index != -1) {
            data[item.substring(0, index)] = item.substr(index + 1).trim();
        }
    });
    return data;
}
function object2formData(obj) {
    var data = new FormData();
    for (var key in obj) {
        data.append(key, obj[key]);
    }
    return data;
}
function doRequest(_options) {
    return new Promise(function (resolve, reject) {
        var _a = _options.url, url = _a === void 0 ? '' : _a, method = _options.method, _body = _options.body, _b = _options.headers, headers = _b === void 0 ? {} : _b, onRequest = _options.onRequest, onResponse = _options.onResponse, _c = _options.mode, mode = _c === void 0 ? 'no-cors' : _c, _d = _options.isFetch, isFetch = _d === void 0 ? true : _d;
        var body;
        if (method.toLocaleUpperCase() == 'GET' && _body) {
            switch (headers['Content-Type']) {
                case 'multipart/form-data':
                    if (_body instanceof FormData) {
                        body = _body;
                    }
                    else if (typeof _body == 'string') {
                        body = object2formData(parseString2Object(_body));
                    }
                    else if (typeof _body == 'object') {
                        body = parseParams(_body);
                    }
                    else {
                        break;
                    }
                    break;
                case 'text/xml':
                    break;
                case 'application/json':
                    break;
                case 'application/x-www-form-urlencoded':
                default:
                    break;
            }
        }
        //参数请求前处理
        if (onRequest) {
            body = onRequest(body);
        }
        if ('fetch' in window && isFetch) {
            fetch(_options.url, {
                method: _options.method,
                headers: headers,
                mode: mode,
                body: body
            }).then(function (res) {
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
            xmlHttp_1.open(method, url, true);
            xmlHttp_1.send();
        }
    });
}
exports.doRequest = doRequest;
