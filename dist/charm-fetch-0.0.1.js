var CFetch =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
var request_1 = __importDefault(__webpack_require__(1));
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
        return (this._options.url + url).replace(/[^(https?:)]\/\//ig, '\/');
    };
    //请求数据
    Fetch.prototype._request = function (options) {
        var _this = this;
        return function (data, callback) {
            return new request_1["default"](__assign({}, _this._options, options, { body: data, callback: callback })).request();
        };
    };
    Fetch.prototype.querystring = function (body) {
        return new request_1["default"](__assign({}, this._options, { method: 'GET', body: body })).querystring();
    };
    Fetch.prototype.get = function (url, options) {
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'get' }));
    };
    Fetch.prototype.post = function (url, options) {
        return this._request(__assign({}, options, { method: 'post', url: this.joinUrl(url) }));
    };
    Fetch.prototype["delete"] = function (url, options) {
        return this._request(__assign({}, options, { method: 'delete', url: this.joinUrl(url) }));
    };
    Fetch.prototype.patch = function (url, options) {
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'patch' }));
    };
    Fetch.prototype.put = function (url, options) {
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: 'put' }));
    };
    Fetch.prototype.upload = function (url, options) {
        return this._request(__assign({}, options, { url: this.joinUrl(url), method: options.method || 'POST', type: 'upload', isFetch: false }));
    };
    Fetch.prototype.download = function (url, options) {
        return this._request(__assign({}, options, { method: options.method || 'POST', type: "download", url: this.joinUrl(url), isFetch: false }));
    };
    Fetch.prototype.request = function (options) {
        return this._request(__assign({}, options, { type: "request" }));
    };
    return Fetch;
}());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
    console.log(data);
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
        console.log(value);
        formData.append(value[0], value[1]);
    }
    return formData;
}
exports.params2FormData = params2FormData;
function buildUrl(url) {
    return (url).replace(/[^(https?:)]\/\//ig, '\/').replace(/\/\??$/, '');
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
            _body = onRequest(_body);
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
            url: encodeURI(url), method: method, headers: headers, body: body, mode: mode, isFetch: isFetch, callback: callback, timeout: timeout, type: type
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
                        res = onResponse_1(res);
                    }
                    resolve(res);
                })["catch"](function (err) {
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
                var _a = _this._options, _b = _a.url, url = _b === void 0 ? '' : _b, method = _a.method, body = _a.body, _c = _a.headers, headers = _c === void 0 ? {} : _c, onResponse = _a.onResponse, _d = _a.mode, mode = _d === void 0 ? 'no-cors' : _d, _e = _a.isFetch, isFetch = _e === void 0 ? true : _e, type = _a.type, callback = _a.callback, timeout = _a.timeout;
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
                        if (Object.prototype.toString.call(callback) == '[object Object]') {
                            reject("callback must object");
                        }
                        callback.progress && (xmlHttp_1.upload.onprogress = callback.progress);
                        callback.loadstart && (xmlHttp_1.upload.onloadstart = callback.loadstart);
                        callback.loadend && (xmlHttp_1.upload.onloadend = callback.loadend);
                        callback.error && (xmlHttp_1.upload.onerror = callback.error);
                        callback.timeout && (xmlHttp_1.upload.ontimeout = callback.timeout);
                        callback.abort && (xmlHttp_1.upload.onabort = callback.abort);
                        callback.load && (xmlHttp_1.upload.onload = callback.load);
                        break;
                    case 'download':
                        xmlHttp_1.onprogress = callback;
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
                        resolve(res);
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


/***/ })
/******/ ])["default"];