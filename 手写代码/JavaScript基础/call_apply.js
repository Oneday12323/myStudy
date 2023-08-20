//call 调用这个函数，并且修改函数的this指向


// Function.prototype.call = function(context,...args:any[]){
//     if(typeof this !=="function"){
//         throw new Error("this object is not a function!")
//     }
//     console.log(this);
//     //没有context或者传进来的是null或者undefined,则重置为window
//     // if(!context){
//     //     context = window
//     // }
//     const fn = Symbol();//指定唯一属性,防止delete 删除错误
//     context[fn]=this;//将this添加到context属性上
//     const result = context[fn](...args);//直接调用context的fn
//     delete context[fn]; //删除掉context新增的symbol属性
//     return result;
// }

// const fn =(a:number,b:number)=>{
//      return a+b
// }
// let obj = {name:"hhh"}
// fn.call(obj,10,20)

Function.prototype.MyCall=function(context,...args){
    if(typeof this!== "function"){
        throw new Error("this object is not a function!")
    }
    if(!context){
        context=global  //没有指定this的时候，就让其指向window
    }
    const fn = Symbol();
    //console.log(context);
    
    console.log("-----------");
    context[fn]=this;  //context这个函数对象 ，让fn这个唯一的属性添加到context这个函数对象上，并且将this赋值给他
    console.log(this);
    console.log(context[fn]);
    const result = context[fn](...args)
    delete context[fn]
    return result
}

const sum = function(a,b){
    //console.log(this);
    let sum =0;
    let ans;
    for(let i =0;i <arguments.length;i++){
        sum+=arguments[i]
    }
    ans=a+b;
    return [sum,ans]
}
let obj ={
    sum:10
}

// console.log(sum(1,1));
console.log(sum.MyCall(null,1,1));
// let res =sum.MyCall(sum,1,1)
// console.log(res);


//普通函数
//构造函数
//对象方法
//事件绑定
//定时器函数
//立即执行函数


//闭包
//防抖节流