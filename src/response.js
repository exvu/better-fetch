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
var body_1 = __importDefault(require("./body"));
var header_1 = __importDefault(require("./header"));
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
