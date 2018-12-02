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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
var funcion_1 = __importDefault(__webpack_require__(9));
var normalize_1 = __importDefault(__webpack_require__(10));
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
var body_1 = __webpack_require__(13);
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


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Api_1 = __importDefault(__webpack_require__(7));
var headers_1 = __webpack_require__(1);
exports.Headers = headers_1["default"];
var response_1 = __webpack_require__(21);
exports.Respnse = response_1["default"];
var request_1 = __webpack_require__(22);
exports.Request = request_1["default"];
var helper_1 = __webpack_require__(0);
exports.helper = helper_1["default"];
exports["default"] = Api_1["default"];


/***/ }),
/* 7 */
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
var Http_1 = __importDefault(__webpack_require__(8));
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
/* 8 */
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
var doRequest_1 = __importDefault(__webpack_require__(11));
var Http = /** @class */ (function () {
    function Http(_options) {
        this._options = _options;
    }
    /**
     * 获取url
     * @param url
     * @param params
     * @param config
     */
    Http.prototype.url = function (url, params, config) {
        config = helper_1["default"].mergeConfig(this._options, config);
        if (config.baseUrl && !helper_1["default"].isAbsoluteURL(url)) {
            config.url = helper_1["default"].joinUrl(config.baseUrl, url);
        }
        return config.url;
    };
    Http.prototype.request = function (config) {
        config = helper_1["default"].mergeConfig(this._options, config);
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
    Http.prototype[method] = function (url, options) {
        return this.request(__assign({}, options, { method: method,
            url: url }));
    };
});
['post', 'put', 'patch', 'delete'].forEach(function (method) {
    Http.prototype[method] = function (url, data, options) {
        return this.request(__assign({}, options, { method: method,
            data: data,
            url: url }));
    };
});
exports["default"] = Http;


/***/ }),
/* 9 */
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
    isAbsoluteURL: isAbsoluteURL,
    joinUrl: joinUrl
};


/***/ }),
/* 10 */
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
/* 11 */
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
var Request_1 = __importDefault(__webpack_require__(12));
var Headers_1 = __importDefault(__webpack_require__(14));
var helper_1 = __importDefault(__webpack_require__(0));
var config_1 = __importDefault(__webpack_require__(15));
var qs_1 = __importDefault(__webpack_require__(18));
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
        request.url = request.url + (request.url.indexOf('?') == -1 ? '?' : '&') + qs_1["default"].stringify(request.params);
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var helper_1 = __importDefault(__webpack_require__(0));
var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/json'
};
function getAllowAUseddapter() {
    var allowList = {};
    if (typeof fetch !== 'undefined' && helper_1["default"].isFunction(fetch)) {
        allowList['fetch'] = __webpack_require__(16)["default"];
    }
    else if (typeof XMLHttpRequest !== 'undefined') {
        allowList['xhr'] = __webpack_require__(17)["default"];
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(19);
var parse = __webpack_require__(20);
var formats = __webpack_require__(5);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var formats = __webpack_require__(5);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? defaults.allowDots : !!options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    var charset = options.charset || defaults.charset;
    if (typeof options.charset !== 'undefined' && options.charset !== 'utf-8' && options.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }
        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'undefined' ? defaults.allowDots : !!options.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (typeof options.charset !== 'undefined' && options.charset !== 'utf-8' && options.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    if (typeof options.charset === 'undefined') {
        options.charset = defaults.charset;
    }

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 21 */
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
/* 22 */
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