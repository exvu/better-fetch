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
var header_1 = __importDefault(require("./header"));
var common_1 = require("./common");
var body_1 = __importDefault(require("./body"));
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request(input, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.headers = new header_1["default"]({});
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
