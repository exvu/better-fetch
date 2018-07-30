"use strict";
exports.__esModule = true;
var common_1 = require("./common");
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
