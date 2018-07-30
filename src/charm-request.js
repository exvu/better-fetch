"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(require("./request"));
var response_1 = __importDefault(require("./response"));
var header_1 = __importDefault(require("./header"));
var common_1 = require("./common");
function buildUrl(url) {
    return (url).replace(/([^(https?:)])(\/)+/ig, '$1\/').replace(/\/\??$/, '\/');
}
exports.buildUrl = buildUrl;
function doRequest(url, _a) {
    var method = _a.method, headers = _a.headers, mode = _a.mode, onResponse = _a.onResponse, onRequest = _a.onRequest, timeout = _a.timeout, data = _a.data, xhr = _a.xhr;
    var options = {
        url: buildUrl(url),
        headers: new header_1["default"](headers),
        mode: mode,
        data: data
    };
    //调用onrequest
    onRequest(options);
    var body;
    //不存在数据,就自动判断
    if (!options.headers.get('Content-Type')) {
        if (typeof options.data !== "object") {
            try {
                options.data = JSON.parse(options.data);
                options.headers.set('Content-Type', "application/json");
            }
            catch (e) {
                options.headers.set('Content-Type', "text/plain");
            }
        }
        else {
            if (common_1.isIncloudFile(data)) {
                options.headers.set('Content-Type', "multipart/form-data");
            }
            else {
                options.headers.set('Content-Type', "application/x-www-form-urlencoded");
            }
        }
    }
    var contentType = options.headers.get('Content-Type') || '';
    var index = contentType.indexOf(';');
    var dataType = index != -1 ?
        contentType.substring(0, contentType)
        : contentType;
    switch (dataType) {
        case "application/json":
            try {
                if (typeof options.data === "string") {
                    body = JSON.parse(options.data);
                }
                else if (typeof data == "object") {
                    body = JSON.stringify(options.data);
                }
                else {
                    throw new Error("application/json allow data type json string or object");
                }
            }
            catch (e) {
                throw new Error("application/json allow data type json string  or object");
            }
            break;
        case "application/x-www-form-urlencoded":
            if (typeof options.data == "object") {
                body = common_1.object2query(options.data);
            }
            else {
                throw new Error("application/x-www-form-urlencoded  allow data type object");
            }
            break;
        case "multipart/form-data":
            if (typeof options.data == "object") {
                body = common_1.params2FormData(options.data);
            }
            else {
                throw new Error("multipart/form-data allow  data type object");
            }
            options.headers["delete"]('content-type');
            break;
        case "text/plain":
        default:
            if (typeof data !== "string") {
                body = JSON.stringify(data);
            }
            break;
    }
    //创建请求对象
    var request = new request_1["default"](options.url, {
        method: method,
        headers: options.headers,
        mode: options.mode,
        body: method.toLocaleUpperCase() == 'GET' ? null : body
    });
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
                    var res = new response_1["default"](xmlHttp_1.responseText, {
                        headers: new header_1["default"](headers_1),
                        status: xmlHttp_1.status,
                        statusText: xmlHttp_1.statusText
                    });
                    var data = onResponse(res);
                    if (!data) {
                        reject("onResponse must return");
                    }
                    resolve(data);
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
