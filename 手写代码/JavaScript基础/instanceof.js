//instanceOf用于判断构造函数的prototype属性是否出现在对象的原型链中的任何位置
//来判断F的prototype属性是否出现在对象O的原型链中
// function myInstanceOf(F,O){  //F是一个实例对象 O是构造函数
//     //获取实例对象的原型对象 通过Object.getPrototypeOf()来获取实例对象的原型对象
//     let proto = Object.getPrototypeOf(F) 
    
//     let prototype = O.prototype //获取构造函数O的原型对象

//     while(true){
//         if(!proto) return false
//         if(proto === prototype) return true

//         proto = Object.getPrototypeOf(proto)
//     }
// }
function myInstanceOf(F,O){
    let proto = Object.getPrototypeOf(F)

    let prototype = O.prototype

    while(true){
        if(!proto) return false;
        if(proto===prototype) return true;

        proto = Object.getPrototypeOf(proto)
    }
}
let a=0;
let str = new String()
let arr = new Array()
console.log(Array.prototype)
let proto = Object.getPrototypeOf(arr)
console.log(proto)
//let res = proto.prototype
let res = Object.getPrototypeOf(proto)
console.log(res)
console.log(myInstanceOf(arr,Array));
console.log(myInstanceOf(str,Array));
console.log(myInstanceOf(a,Array));
console.log(arr instanceof Array);



