"use strict";
exports.__esModule = true;
var common_1 = require("./common");
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
