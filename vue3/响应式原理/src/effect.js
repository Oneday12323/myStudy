"use strict";
//实现依赖的收集和依赖的更新
Object.defineProperty(exports, "__esModule", { value: true });
exports.trigger = exports.track = exports.effect = void 0;
var acctiveEffect; //定义一个全局变量 用来收集闭包
var effect = function (fn) {
    //来一个闭包
    var _effect = function () {
        acctiveEffect = _effect;
        fn();
    };
    _effect();
};
exports.effect = effect;
//依赖的收集
var targetMap = new WeakMap();
var track = function (target, key) {
    //根据target对象去取value，存到depsMap里
    var depsMap = targetMap.get(target);
    //第一次是没有值的
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    //通过key取value
    var deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    //收集effect副作用函数  即收集依赖
    deps.add(acctiveEffect);
};
exports.track = track;
//依赖的更新
var trigger = function (target, key) {
    var depsMap = targetMap.get(target);
    var deps = depsMap.get(key);
    //取到依赖之后进行一个更新
    deps.forEach(function (effect) { return effect(); });
};
exports.trigger = trigger;
