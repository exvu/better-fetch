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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var common_1 = __webpack_require__(1);
var Headers = /** @class */ (function () {
    function Headers(headers) {
        var _this = this;
        this.map = {};
        if (headers instanceof Headers) {
            var list = headers.entries();
            list.forEach(function (_a) {
                var name = _a[0], value = _a[1];
                _this.append(name, value);
            });
        }
        else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                _this.append(name, headers[name]);
            });
        }
    }
    Headers.prototype.append = function (name, value) {
        name = common_1.normalizeName(name);
        value = common_1.normalizeValue(value);
        var list = this.map[name];
        if (!list) {
            list = [];
            this.map[name] = list;
        }
        list.push(value);
    };
    Headers.prototype["delete"] = function (name) {
        delete this.map[common_1.normalizeName(name)];
    };
    Headers.prototype.entries = function () {
        var list = [];
        for (var name_1 in this.map) {
            list.push([name_1, this.map[name_1].join(';')]);
        }
        return list;
    };
    Headers.prototype.get = function (name) {
        var values = this.map[common_1.normalizeName(name)];
        return values ? values[0] : null;
    };
    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(common_1.normalizeName(name));
    };
    Headers.prototype.set = function (name, value) {
        this.map[common_1.normalizeName(name)] = [common_1.normalizeValue(value)];
    };
    Headers.prototype.keys = function () {
        return Object.keys(this.map);
    };
    Headers.prototype.values = function () {
        var list = [];
        for (var name_2 in this.map) {
            list.push(this.map[name_2].join(';'));
        }
        return list;
    };
    return Headers;
}());
exports["default"] = Headers;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function normalizeName(name) {
    if (typeof name !== 'string') {
        name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
}
exports.normalizeName = normalizeName;
function normalizeValue(value) {
    if (typeof value !== 'string') {
        value = String(value);
    }
    return value;
}
exports.normalizeValue = normalizeValue;
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method;
}
exports.normalizeMethod = normalizeMethod;
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
exports.decode = decode;
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
function object2query(_data) {
    var data = parseParams(_data);
    return data.map(function (item) { return item.join('='); }).join('&');
}
exports.object2query = object2query;
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var common_1 = __webpack_require__(1);
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
        else if (common_1.support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body || null;
            this._options = options;
        }
        else if (common_1.support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body || null;
        }
        else if (!body) {
            this._bodyText = '';
        }
        else if (common_1.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
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
        return this.blob().then(common_1.readBlobAsArrayBuffer);
    };
    Body.prototype.formData = function () {
        this.formData = function () {
            return this.text().then(common_1.decode);
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
                return common_1.readBlobAsText(_this._bodyBlob, _this._options);
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
var header_1 = __importDefault(__webpack_require__(0));
var common_1 = __webpack_require__(1);
var body_1 = __importDefault(__webpack_require__(2));
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request(input, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.headers = null;
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
                _this.headers = new header_1["default"](input.headers);
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
            _this.headers = new header_1["default"](options.headers);
        }
        _this.method = common_1.normalizeMethod(options.method || _this.method || 'GET');
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
/* 4 */
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
var header_1 = __importDefault(__webpack_require__(0));
var Response = /** @class */ (function (_super) {
    __extends(Response, _super);
    function Response(bodyInit, options) {
        var _this = _super.call(this) || this;
        _this._initBody(bodyInit, options);
        _this.type = options.type || 'default';
        _this.status = options.status;
        _this.ok = _this.status >= 200 && _this.status < 300;
        _this.statusText = options.statusText;
        _this.headers = options.headers instanceof header_1["default"] ? options.headers : new header_1["default"](options.headers);
        _this.url = options.url || '';
        return _this;
    }
    Response.prototype.clone = function (res) {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new header_1["default"](this.headers),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var api_1 = __importDefault(__webpack_require__(6));
var common_1 = __webpack_require__(1);
exports.object2query = common_1.object2query;
var header_1 = __webpack_require__(0);
exports.Headers = header_1["default"];
var response_1 = __webpack_require__(4);
exports.Respnse = response_1["default"];
var request_1 = __webpack_require__(3);
exports.Request = request_1["default"];
var body_1 = __webpack_require__(2);
exports.Body = body_1["default"];
exports["default"] = api_1["default"];


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
exports.__esModule = true;
var charm_request_1 = __webpack_require__(7);
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
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'get', __assign({}, options, { data: data }));
    };
    Api.prototype.post = function (url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return this._request(url, 'post', __assign({}, options, { data: data }));
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(__webpack_require__(3));
var response_1 = __importDefault(__webpack_require__(4));
var header_1 = __importDefault(__webpack_require__(0));
function buildUrl(url) {
    return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\??$/, '\/');
}
exports.buildUrl = buildUrl;
function doRequest(url, _a) {
    var method = _a.method, headers = _a.headers, mode = _a.mode, onResponse = _a.onResponse, onRequest = _a.onRequest, timeout = _a.timeout, data = _a.data, xhr = _a.xhr;
    //创建请求对象
    var request = new request_1["default"](buildUrl(url), {
        method: method,
        headers: new header_1["default"](headers),
        mode: mode,
        body: method.toLocaleUpperCase() == 'GET' ? null : data
    });
    //调用onrequest
    onRequest(request, data);
    return doXmlHttpRequest(request, {
        onResponse: onResponse, timeout: timeout, xhr: xhr
    });
}
exports.doRequest = doRequest;
function doXmlHttpRequest(request, _a) {
    var onResponse = _a.onResponse, timeout = _a.timeout, xhr = _a.xhr;
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
            if (timeout) {
                xmlHttp_1.timeout = timeout;
            }
            //设置请求方法与请求地址
            xmlHttp_1.open(request.method, request.url, true);
            //调用xhr方法
            if (xhr) {
                if (Object.prototype.toString.call(xhr) != '[object Function]') {
                    reject("xhr必须是函数");
                }
                else {
                    xhr(xmlHttp_1);
                }
            }
            //存在请求头就设置请求头
            if (request.headers) {
                var headers = request.headers.entries();
                headers.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    xmlHttp_1.setRequestHeader(key, value);
                });
            }
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
                    var res = new response_1["default"](xmlHttp_1.statusText, {
                        headers: new header_1["default"](headers_1),
                        status: xmlHttp_1.status,
                        statusText: xmlHttp_1.statusText
                    });
                    res = onResponse(res);
                    if (!(res instanceof response_1["default"])) {
                        reject("onResponse must return response object");
                    }
                    resolve(res);
                }
                catch (err) {
                    reject(err);
                }
            };
            xmlHttp_1.onerror = function (err) {
                reject(err);
            };
            xmlHttp_1.send(request._bodyInit || null);
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.doXmlHttpRequest = doXmlHttpRequest;
;


/***/ })
/******/ ])["default"];