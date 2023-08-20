//思路：将传入的对象作为原型

// function create(obj){
//     function F(){}
//     F.prototype=obj
//     return new F() //返回一个F构造函数的实例，该实例的原型对象为obj
// } 

function create(obj){
    function F(){}
    F.prototype=obj
    return new F()
}
