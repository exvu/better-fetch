window["CApi"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
var checkType_1 = __importDefault(__webpack_require__(3));
var funcion_1 = __importDefault(__webpack_require__(7));
var normalize_1 = __importDefault(__webpack_require__(8));
exports["default"] = __assign({}, checkType_1["default"], funcion_1["default"], normalize_1["default"]);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var helper_1 = __importDefault(__webpack_require__(0));
var Headers = /** @class */ (function () {
    /**
     * @param init 可选
     * 通过一个包含任意 HTTP headers 的对象来预设你的 Headers. 可以是一个ByteString 对象; 或者是一个已存在的 Headers 对象.
     */
    function Headers(init) {
        var _this = this;
        this.map = {};
        if (init instanceof Headers) {
            var list = init.entries();
            list.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.map[key] = value.split(';');
            });
        }
        else if (init && helper_1["default"].isObject(init)) {
            Object.getOwnPropertyNames(init).forEach(function (key) {
                _this.append(key, init[key]);
            });
        }
        else {
            throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)'");
        }
    }
    Headers.prototype.append = function (key, value) {
        key = helper_1["default"].normalizeHeadersKey(key);
        value = helper_1["default"].normalizeHeadersValue(value);
        if (!(key in this.map)) {
            this.map[key] = [];
        }
        this.map[key].push(value);
    };
    Headers.prototype["delete"] = function (key) {
        delete this.map[helper_1["default"].normalizeHeadersKey(key)];
    };
    Headers.prototype.entries = function () {
        var list = [];
        for (var key in this.map) {
            list.push([key, this.map[key].join(';')]);
        }
        return list;
    };
    Headers.prototype.get = function (key) {
        var values = this.map[helper_1["default"].normalizeHeadersKey(key)];
        return values ? values[0] : null;
    };
    Headers.prototype.has = function (key) {
        return this.map.hasOwnProperty(helper_1["default"].normalizeHeadersKey(key));
    };
    Headers.prototype.set = function (key, value) {
        this.map[helper_1["default"].normalizeHeadersKey(key)] = [helper_1["default"].normalizeHeadersValue(value)];
    };
    Headers.prototype.keys = function () {
        return Object.keys(this.map);
    };
    Headers.prototype.values = function () {
        var list = [];
        for (var key in this.map) {
            list.push(this.map[key].join(';'));
        }
        return list;
    };
    return Headers;
}());
exports["default"] = Headers;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_1 = __webpack_require__(11);
var helper_1 = __importDefault(__webpack_require__(0));
var Body = /** @class */ (function () {
    function Body() {
        this.bodyUsed = false;
        this._bodyText = '';
        this._bodyBlob = null;
        this._bodyFormData = null;
    }
    Body.prototype._initBody = function (body, options) {
        this._bodyInit = body;
        if (typeof body === "string") {
            this._bodyText = body;
        }
        else if (body_1.support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body || null;
            this._options = options;
        }
        else if (body_1.support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body || null;
        }
        else if (!body) {
            this._bodyText = '';
        }
        else if (body_1.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        }
        else {
            throw new Error('unsupported BodyInit type');
        }
    };
    Body.prototype.blob = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rejected = Body.consumed(_this);
            if (rejected) {
                reject(rejected);
            }
            if (_this._bodyBlob) {
                return resolve(_this._bodyBlob);
            }
            else if (_this._bodyFormData) {
                return reject(new Error('could not read FormData body as blob'));
            }
            else {
                return resolve(new Blob([_this._bodyText]));
            }
        });
    };
    Body.prototype.arrayBuffer = function () {
        return this.blob().then(body_1.readBlobAsArrayBuffer);
    };
    Body.prototype.formData = function () {
        this.formData = function () {
            return this.text().then(helper_1["default"].decode);
        };
    };
    Body.prototype.json = function () {
        return this.text().then(JSON.parse);
    };
    Body.prototype.text = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rejected = Body.consumed(_this);
            if (rejected) {
                reject(rejected);
            }
            if (_this._bodyBlob) {
                return body_1.readBlobAsText(_this._bodyBlob, _this._options);
            }
            else if (_this._bodyFormData) {
                return reject(new Error('could not read FormData body as text'));
            }
            else {
                return resolve(_this._bodyText);
            }
        });
    };
    Body.consumed = function (body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
    };
    return Body;
}());
exports["default"] = Body;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function getType(obj) {
    return Object.prototype.toString.call(obj);
}
function isNumber(value) {
    return getType(value) === '[object Number]';
}
function isArray(value) {
    return getType(value) === '[object Array]';
}
function isArrayBuffer(value) {
    return getType(value) === '[object ArrayBuffer]';
}
function isFormData(value) {
    return getType(value) === '[object FormData]';
}
function isString(value) {
    return typeof value === 'string';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
function isFile(value) {
    return toString.call(value) === '[object File]';
}
function isBlob(value) {
    return toString.call(value) === '[object Blob]';
}
function isFunction(value) {
    return toString.call(value) === '[object Function]';
}
function isStream(value) {
    return isObject(value) && isFunction(value.pipe);
}
function isURLSearchParams(value) {
    return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}
exports["default"] = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBlob: isBlob,
    isDate: isDate,
    isFile: isFile,
    isFormData: isFormData,
    isFunction: isFunction,
    isNumber: isNumber,
    isObject: isObject,
    isStream: isStream,
    isString: isString,
    isURLSearchParams: isURLSearchParams,
    isUndefined: isUndefined
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Api_1 = __importDefault(__webpack_require__(5));
var headers_1 = __webpack_require__(1);
exports.Headers = headers_1["default"];
var response_1 = __webpack_require__(16);
exports.Respnse = response_1["default"];
var request_1 = __webpack_require__(17);
exports.Request = request_1["default"];
var helper_1 = __webpack_require__(0);
exports.helper = helper_1["default"];
exports["default"] = Api_1["default"];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Http_1 = __importDefault(__webpack_require__(6));
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    /**
     *
     * @param key 实例唯一键
     * @param _options 配置参数 createOption
     */
    function Api(key, _options) {
        var _this = _super.call(this, _options) || this;
        Api._instances[key] = _this;
        return _this;
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
     * 实例容器
     */
    Api._instances = {};
    return Api;
}(Http_1["default"]));
exports["default"] = Api;


/***/ }),
/* 6 */
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
var helper_1 = __importDefault(__webpack_require__(0));
var doRequest_1 = __importDefault(__webpack_require__(9));
var Http = /** @class */ (function () {
    function Http(options) {
        this.options = options;
    }
    /**
     * 获取url
     * @param url
     * @param params
     * @param config
     */
    Http.prototype.url = function (url, params) {
        var config = helper_1["default"].mergeConfig(this.options, {
            params: params,
            url: url.toString()
        });
        if (config.baseUrl && !helper_1["default"].isAbsoluteURL(config.url)) {
            config.url = helper_1["default"].joinUrl(config.baseUrl, config.url);
        }
        return helper_1["default"].buildUrl(config.url, params);
    };
    Http.prototype.request = function (config) {
        config = helper_1["default"].mergeConfig(this.options, config);
        config = helper_1["default"].filter(config, [
            'baseUrl', 'onRequest', 'onResponse', 'timeout', 'headers', 'data', 'params',
            'onDownloadProgress', 'onUploadProgress', 'adapter', 'url', 'method', 'mode',
        ]);
        return doRequest_1["default"](config);
    };
    return Http;
}());
/**
 * 根据mdn文档 设置get ,head options 不能传递body
 */
['get', 'head', 'options'].forEach(function (method) {
    Http.prototype[method] = Http[method] = function (url, options) {
        return this.request(__assign({}, options, { method: method,
            url: url }));
    };
});
['post', 'put', 'patch', 'delete'].forEach(function (method) {
    Http.prototype[method] = Http[method] = function (url, data, options) {
        return this.request(__assign({}, options, { method: method,
            data: data,
            url: url }));
    };
});
exports["default"] = Http;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var checkType_1 = __importDefault(__webpack_require__(3));
function forEach(obj, callback) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    if (checkType_1["default"].isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            callback.call(null, obj[i], i, obj);
        }
    }
    else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                callback.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * 合并多个对象
 */
function merge() {
    var _arguments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _arguments[_i] = arguments[_i];
    }
    var obj = {};
    for (var i = 0; i < _arguments.length; i++) {
        forEach(_arguments[i], function (val, key) {
            if (typeof obj[key] === 'object' && typeof val === 'object') {
                obj[key] = merge(obj[key], val);
            }
            else {
                obj[key] = val;
            }
        });
    }
    return obj;
}
/**
 * 合并多个对象
 */
function deepMerge() {
    var _arguments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _arguments[_i] = arguments[_i];
    }
    var obj = {};
    for (var i = 0; i < _arguments.length; i++) {
        forEach(_arguments[i], function (val, key) {
            if (!(checkType_1["default"].isObject(obj[key]))) {
                obj[key] = {};
            }
            if (checkType_1["default"].isObject(val)) {
                obj[key] = deepMerge(obj[key], val);
            }
            else {
                obj[key] = val;
            }
        });
    }
    return obj;
}
function mergeConfig() {
    var _arguments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _arguments[_i] = arguments[_i];
    }
    var config = {};
    var _loop_1 = function (i) {
        var _config = _arguments[i];
        //合并url，data，params
        forEach(['url', 'method', 'data', 'params'], function (prop) {
            if (typeof _config[prop] !== 'undefined') {
                config[prop] = _config[prop];
            }
        });
        forEach(['headers', 'auth', 'proxy'], function (prop) {
            if (checkType_1["default"].isObject(_config[prop])) {
                config[prop] = deepMerge(config[prop], _config[prop]);
            }
            else if (typeof _config[prop] !== 'undefined') {
                config[prop] = _config[prop];
            }
        });
        forEach([
            'baseUrl', 'onRequest', 'onResponse', 'paramsSerializer',
            'timeout',
        ], function (prop) {
            if (typeof _config[prop] !== 'undefined') {
                config[prop] = _config[prop];
            }
            else if (typeof _config[prop] !== 'undefined') {
                config[prop] = _config[prop];
            }
        });
    };
    for (var i = 0; i < _arguments.length; i++) {
        _loop_1(i);
    }
    return config;
}
function trim(str) {
    if (!checkType_1["default"].isString(str)) {
        throw new TypeError('value type not string');
    }
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * url编码
 * @param body
 */
function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
    });
    return form;
}
/**
 * 将参数转换为querystring
 */
function object2query(_data) {
    var data = parseParams(_data);
    return data.map(function (item) { return item.join('='); }).join('&');
}
/**
* 解析参数，
* 将对象转换成obj[a]的形式
* 将数组转换成obj[0]的形式
*/
function parseParams(_data, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var data = [];
    for (var key in _data) {
        if (_data[key] == undefined || _data[key] == null) {
            continue;
        }
        var _key = prefix == '' ? key : (prefix + '[' + key + ']');
        //object
        if (Object.prototype.toString.call(_data[key]) == '[object Object]') {
            data.push.apply(data, parseParams(_data[key], _key));
        }
        else if (Object.prototype.toString.call(_data[key]) == '[object Array]') {
            for (var i in _data[key]) {
                var v = _data[key][i];
                if (typeof v == 'object') {
                    data.push.apply(data, parseParams(v, _key + '[' + i + ']'));
                }
                else {
                    data.push([_key + '[' + i + ']', v]);
                }
            }
        }
        else {
            data.push([_key, _data[key]]);
        }
    }
    return data;
}
function buildUrl(url, params) {
    var query = object2query(params);
    return url + (query ? (url.indexOf('?') == -1 ? '?' : '&') + query : '');
}
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
/**
* 是否包含文件
* @param data
*/
function isIncloudFile(data) {
    var flag = false;
    if (typeof data == 'object') {
        var keys = Object.getOwnPropertyNames(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (data[key] instanceof File) {
                return true;
            }
            else if (typeof data[key] == 'object') {
                flag = isIncloudFile(data[key]);
                if (flag) {
                    return true;
                }
            }
        }
    }
    return flag;
}
function isAbsoluteURL(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
;
function joinUrl(prefix, url) {
    return url
        ? prefix.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
        : prefix;
}
;
function filter(data, _filter) {
    var value = {};
    for (var key in data) {
        if (!(_filter.indexOf(key) == -1)) {
            value[key] = data[key];
        }
    }
    return value;
}
exports["default"] = {
    merge: merge,
    forEach: forEach,
    filter: filter,
    mergeConfig: mergeConfig,
    deepMerge: deepMerge,
    trim: trim,
    isIncloudFile: isIncloudFile,
    params2FormData: params2FormData,
    decode: decode,
    parseParams: parseParams,
    object2query: object2query,
    isAbsoluteURL: isAbsoluteURL,
    joinUrl: joinUrl,
    buildUrl: buildUrl
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
/**
 * 规范键名
 * @param name
 */
function normalizeHeadersKey(name) {
    if (typeof name !== 'string') {
        name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
}
/**
 * 规范键值
 * @param name
 */
function normalizeHeadersValue(value) {
    if (typeof value !== 'string') {
        value = String(value);
    }
    return value;
}
/**
 * 规范方法名
 * @param name
 */
function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method;
}
exports["default"] = {
    normalizeHeadersKey: normalizeHeadersKey,
    normalizeHeadersValue: normalizeHeadersValue,
    normalizeMethod: normalizeMethod
};


/***/ }),
/* 9 */
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
var Request_1 = __importDefault(__webpack_require__(10));
var Headers_1 = __importDefault(__webpack_require__(12));
var helper_1 = __importDefault(__webpack_require__(0));
var config_1 = __importDefault(__webpack_require__(13));
function doRequest(config) {
    if (config.baseUrl && !helper_1["default"].isAbsoluteURL(config.url)) {
        config.url = helper_1["default"].joinUrl(config.baseUrl, config.url);
    }
    var request = {
        url: config.url,
        method: config.method,
        headers: new Headers_1["default"](config.headers || {}),
        data: helper_1["default"].isObject(config.data) ? config.data : {},
        params: helper_1["default"].isObject(config.params) ? config.params : {},
        timeout: config.timeout && config.timeout > 0 ? config.timeout : 4000
    };
    //请求拦截器
    if (config.onRequest && helper_1["default"].isFunction(config.onRequest)) {
        config.onRequest(request);
    }
    if (request.params && helper_1["default"].isObject(request.params)) {
        request.url = helper_1["default"].buildUrl(request.url, request.params);
    }
    var options = {
        onDownloadProgress: config.onDownloadProgress,
        onUploadProgress: config.onUploadProgress,
        adapter: config.adapter,
        timeout: request.timeout,
        request: new Request_1["default"](request.url, __assign({ headers: request.headers, method: config.method, mode: config.mode }, ['GET', 'HEAD', 'OPTIONS'].indexOf(config.method) == -1 ? {} : {
            body: request.data
        }))
    };
    //获取合适的适配器
    var adapter = config_1["default"].getAdapter(options);
    return adapter(options).then(function (res) {
        //响应拦截器
        if (config.onResponse && helper_1["default"].isFunction(config.onResponse)) {
            return config.onResponse(res);
        }
    });
}
exports["default"] = doRequest;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var headers_1 = __importDefault(__webpack_require__(1));
var helper_1 = __importDefault(__webpack_require__(0));
var body_1 = __importDefault(__webpack_require__(2));
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request(input, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.headers = new headers_1["default"]({});
        _this.method = 'GET';
        _this.mode = 'no-cors';
        _this.bodyUsed = false;
        _this.body = options.body || null;
        if (input instanceof Request) {
            if (options.bodyUsed) {
                throw new TypeError('Already read');
            }
            _this.url = options.url || '';
            _this.method = options.method || '';
            _this.mode = options.mode || "no-cors";
            if (!options.headers) {
                _this.headers = new headers_1["default"](input.headers);
            }
            if (!_this.body) {
                _this.body = input.body;
                input.bodyUsed = true;
            }
        }
        else {
            _this.url = input;
        }
        if (options.headers || !_this.headers) {
            _this.headers = new headers_1["default"](options.headers);
        }
        _this.method = helper_1["default"].normalizeMethod(options.method || _this.method || 'GET');
        _this.mode = options.mode || _this.mode || null;
        if ((_this.method === 'GET' || _this.method === 'HEAD') && _this.body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        _this._initBody(_this.body, options);
        return _this;
    }
    Request.prototype.clone = function (target) {
        return new Request(this);
    };
    return Request;
}(body_1["default"]));
exports["default"] = Request;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * 判断是否支持某些特性
 * @param name
 */
exports.support = {
    blob: 'FileReader' in window && 'Blob' in window && (function () {
        try {
            new Blob();
            return true;
        }
        catch (e) {
            return false;
        }
    })(),
    formData: 'FormData' in window,
    arrayBuffer: 'ArrayBuffer' in window
};
function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
}
exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(reader.error);
        };
    });
}
exports.fileReaderReady = fileReaderReady;
function readBlobAsText(blob, options) {
    var reader = new FileReader();
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : '';
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/;
    var _charset = blob.type.match(regex) || contentType.match(regex);
    var args = [blob];
    if (_charset) {
        args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''));
    }
    reader.readAsText.apply(reader, args);
    return fileReaderReady(reader);
}
exports.readBlobAsText = readBlobAsText;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var helper_1 = __importDefault(__webpack_require__(0));
var Headers = /** @class */ (function () {
    /**
     * @param init 可选
     * 通过一个包含任意 HTTP headers 的对象来预设你的 Headers. 可以是一个ByteString 对象; 或者是一个已存在的 Headers 对象.
     */
    function Headers(init) {
        var _this = this;
        this.map = {};
        if (init instanceof Headers) {
            var list = init.entries();
            list.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.map[key] = value.split(';');
            });
        }
        else if (init && helper_1["default"].isObject(init)) {
            Object.getOwnPropertyNames(init).forEach(function (key) {
                _this.append(key, init[key]);
            });
        }
        else {
            throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)'");
        }
    }
    Headers.prototype.append = function (key, value) {
        key = helper_1["default"].normalizeHeadersKey(key);
        value = helper_1["default"].normalizeHeadersValue(value);
        if (!(key in this.map)) {
            this.map[key] = [];
        }
        this.map[key].push(value);
    };
    Headers.prototype["delete"] = function (key) {
        delete this.map[helper_1["default"].normalizeHeadersKey(key)];
    };
    Headers.prototype.entries = function () {
        var list = [];
        for (var key in this.map) {
            list.push([key, this.map[key].join(';')]);
        }
        return list;
    };
    Headers.prototype.get = function (key) {
        var values = this.map[helper_1["default"].normalizeHeadersKey(key)];
        return values ? values[0] : null;
    };
    Headers.prototype.has = function (key) {
        return this.map.hasOwnProperty(helper_1["default"].normalizeHeadersKey(key));
    };
    Headers.prototype.set = function (key, value) {
        this.map[helper_1["default"].normalizeHeadersKey(key)] = [helper_1["default"].normalizeHeadersValue(value)];
    };
    Headers.prototype.keys = function () {
        return Object.keys(this.map);
    };
    Headers.prototype.values = function () {
        var list = [];
        for (var key in this.map) {
            list.push(this.map[key].join(';'));
        }
        return list;
    };
    return Headers;
}());
exports["default"] = Headers;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var helper_1 = __importDefault(__webpack_require__(0));
function getAllowAUseddapter() {
    var allowList = {};
    if (typeof fetch !== 'undefined' && helper_1["default"].isFunction(fetch)) {
        allowList['fetch'] = __webpack_require__(14)["default"];
    }
    else if (typeof XMLHttpRequest !== 'undefined') {
        allowList['xhr'] = __webpack_require__(15)["default"];
    }
    return allowList;
}
function getAdapter(configs) {
    var allowList = getAllowAUseddapter();
    var type = configs.adapter;
    if (type) {
        if (!(type in allowList)) {
            throw new Error("env not supper " + type);
        }
        return allowList[type];
    }
    var adapter;
    if ('fetch' in allowList && !(configs.onDownloadProgress || configs.onUploadProgress)) {
        adapter = allowList['fetch'];
    }
    else if ('xhr' in allowList) {
        adapter = allowList['xhr'];
    }
    else {
        throw new Error('env not supper request');
    }
    return adapter;
}
exports["default"] = {
    getAdapter: getAdapter
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
function fetchAdater(_a) {
    var request = _a.request, config = __rest(_a, ["request"]);
    return new Promise(function (resolve, reject) {
        try {
            var timeoutId_1;
            if (config.timeout) {
                timeoutId_1 = setTimeout(function () {
                    reject(new Error("fetch timeout"));
                }, config.timeout);
            }
            var body = request.body;
            fetch(request.url, {
                method: request.method,
                headers: request.headers.entries(),
                mode: request.mode,
                body: body
            }).then(function (res) {
                clearTimeout(timeoutId_1);
                if (res.status >= 200 && res.status < 300) {
                    resolve(res);
                }
                var error = new Error(res.statusText);
                error.response = res;
                throw error;
            })["catch"](function (err) {
                clearTimeout(timeoutId_1);
                reject(err);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports["default"] = fetchAdater;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var helper_1 = __importDefault(__webpack_require__(0));
function xhrAdapter(_a) {
    var request = _a.request, config = __rest(_a, ["request"]);
    return new Promise(function (resolve, reject) {
        try {
            var xmlHttp_1;
            //IE7以上
            if ('XMLHttpRequest' in window) {
                xmlHttp_1 = new XMLHttpRequest();
            }
            else {
                xmlHttp_1 = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (config.timeout) {
                xmlHttp_1.timeout = config.timeout;
            }
            //设置请求方法与请求地址
            xmlHttp_1.open(request.method, request.url, true);
            //存在请求头就设置请求头
            if (request.headers) {
                var headers = request.headers.entries();
                headers.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    xmlHttp_1.setRequestHeader(key, value);
                });
            }
            //设置下载进度回调函数
            if (config.onDownloadProgress && helper_1["default"].isFunction(config.onDownloadProgress)) {
                xmlHttp_1.onprogress = config.onDownloadProgress;
            }
            //设置上传进度回调函数
            if (config.onUploadProgress && helper_1["default"].isFunction(config.onUploadProgress)) {
                xmlHttp_1.onprogress = config.onUploadProgress;
            }
            xmlHttp_1.upload.onprogress;
            xmlHttp_1.onreadystatechange = xmlHttp_1.onload = function onload() {
                try {
                    if (xmlHttp_1.readyState != 4) {
                        return;
                    }
                    var headers_1 = {};
                    //获取response对象
                    xmlHttp_1.getAllResponseHeaders().split('\n').forEach(function (item) {
                        var index = item.indexOf(':');
                        if (index != -1) {
                            headers_1[item.substring(0, index)] = item.substr(index + 1).trim();
                        }
                    });
                    var res = new Response(xmlHttp_1.responseText, {
                        headers: new Headers(headers_1),
                        status: xmlHttp_1.status,
                        statusText: xmlHttp_1.statusText
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
            var body = request.body;
            xmlHttp_1.send(body || null);
        }
        catch (e) {
            reject(e);
        }
    });
}
exports["default"] = xhrAdapter;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_1 = __importDefault(__webpack_require__(2));
var headers_1 = __importDefault(__webpack_require__(1));
var Response = /** @class */ (function (_super) {
    __extends(Response, _super);
    function Response(bodyInit, options) {
        var _this = _super.call(this) || this;
        _this._initBody(bodyInit, options);
        _this.type = options.type || 'default';
        _this.status = options.status;
        _this.ok = _this.status >= 200 && _this.status < 300;
        _this.statusText = options.statusText;
        _this.headers = options.headers instanceof headers_1["default"] ? options.headers : new headers_1["default"](options.headers);
        _this.url = options.url || '';
        return _this;
    }
    Response.prototype.clone = function (res) {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new headers_1["default"](this.headers),
            url: this.url,
            type: 'default'
        });
    };
    Response.error = function () {
        var response = new Response(null, {
            status: 0,
            statusText: '',
            type: 'error'
        });
        return response;
    };
    return Response;
}(body_1["default"]));
exports["default"] = Response;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var headers_1 = __importDefault(__webpack_require__(1));
var helper_1 = __importDefault(__webpack_require__(0));
var body_1 = __importDefault(__webpack_require__(2));
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request(input, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.headers = new headers_1["default"]({});
        _this.method = 'GET';
        _this.mode = 'no-cors';
        _this.bodyUsed = false;
        _this.body = options.body || null;
        if (input instanceof Request) {
            if (options.bodyUsed) {
                throw new TypeError('Already read');
            }
            _this.url = options.url || '';
            _this.method = options.method || '';
            _this.mode = options.mode || "no-cors";
            if (!options.headers) {
                _this.headers = new headers_1["default"](input.headers);
            }
            if (!_this.body) {
                _this.body = input.body;
                input.bodyUsed = true;
            }
        }
        else {
            _this.url = input;
        }
        if (options.headers || !_this.headers) {
            _this.headers = new headers_1["default"](options.headers);
        }
        _this.method = helper_1["default"].normalizeMethod(options.method || _this.method || 'GET');
        _this.mode = options.mode || _this.mode || null;
        if ((_this.method === 'GET' || _this.method === 'HEAD') && _this.body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        _this._initBody(_this.body, options);
        return _this;
    }
    Request.prototype.clone = function (target) {
        return new Request(this);
    };
    return Request;
}(body_1["default"]));
exports["default"] = Request;


/***/ })
/******/ ])["default"];