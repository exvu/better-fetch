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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var main_1 = __importDefault(__webpack_require__(1));
exports["default"] = __assign({ download: main_1.download,
    upload: main_1.upload,
    request: main_1.request }, main_1["default"]);


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
var fetch_1 = __webpack_require__(2);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
    console.log(_data);
    for (var key in _data) {
        if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (var _i = 0, _a = _data[key]; _i < _a.length; _i++) {
                var value = _a[_i];
                formData.append(key + '[]', value);
                console.log(key + '[]', value);
            }
        }
        else {
            console.log(key, _data[key]);
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
        var body = {};
        //参数请求前处理
        if (onRequest) {
            _body = onRequest(_body);
        }
        if (method.toLocaleUpperCase() == 'GET' && _body) {
            switch (headers['Content-Type']) {
                case 'multipart/form-data':
                    console.log(1);
                    if (_body instanceof FormData) {
                        body = _body;
                    }
                    else if (typeof _body == 'string') {
                        body = object2formData(parseString2Object(_body));
                    }
                    else if (typeof _body == 'object') {
                        body = parseParams(_body);
                        console.log(body, 111);
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
        if ('fetch' in window && isFetch) {
            fetch(_options.url, {
                method: _options.method,
                headers: headers,
                mode: mode,
                body: paramstoFormData(body)
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
            xmlHttp_1.send(paramstoFormData(body));
        }
    });
}
exports.doRequest = doRequest;


/***/ })
/******/ ])["default"];