"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var api = index_1.default.create("api", {
    url: 'www',
    request: function () {
    },
    response: function () {
    }
});
/**
 * 请求1
 */
api.get("1").then(function () {
}).catch(function () {
});
api.post("1").then(function () {
}).catch(function () {
});
