"use strict";
exports.__esModule = true;
var CRequest = /** @class */ (function () {
    function CRequest(_options) {
        this._options = _options;
        this._thens = [];
        this._catchs = [];
        this._fetch();
    }
    /**
     * 连贯操作
     */
    CRequest.prototype.then = function (callback) {
        this._thens.push(callback);
        return this;
    };
    /**
     * 异常捕获
     */
    CRequest.prototype["catch"] = function (callback) {
        this._thens.push(callback);
        return this;
    };
    /**
     * 结束请求
     */
    CRequest.prototype.abort = function () {
    };
    /**
     * 当使用then方法时绑定对象
     * 当对象被销毁时，就终止请求
     */
    CRequest.prototype.bind = function (ref) {
        this._bind = ref;
        return this;
    };
    /**
     *当使用await/async时绑定对象
     *可以根据将回调参数调用abort 实现终止请求
     */
    CRequest.prototype.ref = function (callback) {
        callback(this._bind);
        return this;
    };
    CRequest.prototype._fetch = function () {
        var _this = this;
        var _a = this._options, url = _a.url, method = _a.method, _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c, onRequest = _a.onRequest, onResponse = _a.onResponse;
        //参数请求前处理
        if (onRequest) {
            body = onRequest(body);
        }
        if ('fetch' in window) {
            fetch(this._options.url, {
                method: this._options.method,
                headers: headers
            }).then(function (res) {
                if (onResponse) {
                    return onResponse(res);
                }
                return res;
            })["catch"](function (err) {
                _this._response(err, null);
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
                    _this._response(null, onResponse ? onResponse(xmlHttp_1) : xmlHttp_1);
                }
                catch (err) {
                    _this._response(err, xmlHttp_1);
                }
            };
            xmlHttp_1.open(method, url, true);
            xmlHttp_1.send();
        }
    };
    CRequest.prototype._response = function (err, res) {
        var options = this._options;
        for (var _i = 0, _a = this._thens; _i < _a.length; _i++) {
            var thenFun = _a[_i];
            try {
                options = thenFun(options);
            }
            catch (e) {
                for (var _b = 0, _c = this._catchs; _b < _c.length; _b++) {
                    var catchFun = _c[_b];
                    try {
                        options = catchFun(options);
                        break;
                    }
                    catch (e) {
                        continue;
                    }
                }
            }
        }
    };
    return CRequest;
}());
exports["default"] = CRequest;
