"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactive = void 0;
var effect_1 = require("./effect.js");
var reactive = function (target) {
    return new Proxy(target, {
        get: function (target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            (0, effect_1.track)(target, key);
            return res;
        },
        set: function (target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            (0, effect_1.trigger)(target, key);
            return res;
        }
    });
};
exports.reactive = reactive;
