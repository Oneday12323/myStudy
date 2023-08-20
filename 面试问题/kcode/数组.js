// 1. 判断是否是数组的几种方法
/**
 * instanceof 该运算符用来检测构造函数的prototype属性是否出现在对象的原型链中任何位置，返回一个布尔值
 * 
 * 
 */
let arr = []
console.log(arr instanceof Array)
// 手写instanceof
function myInstanceof(L,R){
    // 声明一个变量获取对象的__proto__
    let lobj = L.__proto__
    //做循环，当link指向空的时候就返回false
    while(lobj !== null){
        if(lobj = R.prototype) return true
        lobj = lobj.__proto__

    }
    return false 
}
console.log(Object(arr))
let obj1 = {
    name:'xiao',
    age:18
}
console.log(Object(obj1))
//Object(a) 判断a是否使一个对象

const myInstanceof2 = (obj,target)=>{
     // 对于参数obj如果是非对象直接返回false
    if( Object(obj) !== obj) return false
    // 对于参数target可以认为只能为函数且不能没有Prototype属性
    if(typeof target !== 'function' || !target.prototype) return false
    // 声明一个变量获取对象的__proto__
    let obj1 = obj.__proto__
    while(obj1 !== null) {
        // 如果找到说明target.prototype在L的原型链上，即返回true
        if(obj1 == target.prototype) return true
        obj1 = obj1.__proto__
    }
    return false
}

console.log(myInstanceof2(obj1,Object))

/**
 * constructor 实例的构造函数属性constructor指向构造函数
 * 通过constructor属性可以判断是否为一个数组
 */
let arr2 = []
console.log(arr2.constructor === Array)

/**
 * Object.prototype.toString 
 * Object.prototype.toString.call()可以获取到对象的不同类型
 *  
 * 为什么要用到call
 * */ 

let arr3 = [1,2,3]
console.log(Object.prototype.toString.call(arr3))
console.log(Object(arr3))
// toString()方法将对象转换成原始值
console.log(Object.prototype)