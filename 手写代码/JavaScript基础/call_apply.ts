Function.prototype.call = function(context,...args:any[]){
    if(typeof this !=="function"){
        throw new Error("this object is not a function!")
    }
    console.log(this);
    //没有context或者传进来的是null或者undefined,则重置为window
    // if(!context){
    //     context = window
    // }
    const fn = Symbol();//指定唯一属性,防止delete 删除错误
    context[fn]=this;//将this添加到context属性上
    const result = context[fn](...args);//直接调用context的fn
    delete context[fn]; //删除掉context新增的symbol属性
    return result;
}

const fn =(a:number,b:number)=>{
     return a+b
}
let obj = {name:"hhh"}
fn.call(obj,10,20)
