/* 
    通过async可以快速的创建异步函数
*/

function fn(){
    return Promise.resolve(10)
}
fn().then(r=>console.log(r))

/* 
    通过async可以快速的创建异步函数
        异步函数的返回值会自动封装到一个Promise中返回
    在async声明的异步函数中可以使用await关键字来调用异步函数
*/
// async function fn2(){
//     return 5
// }
// const res = fn2()
// console.log(res)
//fn2().then(r=>console.log(r))

function sum(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

async function fn3(){
    //SubmitEvent()
    sum(123,456).then(r=>console.log(r))
}
fn3()
const re = Promise.resolve(10) //同步任务
console.log(re)