/* 
    静态方法
        Promise.resolve()创建一个立即完成的Promise
        Promise.reject()创建一个立即拒绝的Promise
        Promise.all([...])同时返回多个Promise的执行结果
            其中有一个错误就返回报错
        Promise.allSettled([...])同时返回多个Promise的执行结果(无论成功或失败)
            { status: 'fulfilled', value: 579 },
            { status: 'fulfilled', value: 912 },
            { status: 'rejected', reason: 'hhh' },
        Promise.race([...])返回执行最快的Promise(不考虑对错)
        Promise.any([...])返回执行最快的 完成的Promise
*/

Promise.resolve(10).then(r=>console.log(r))

/* new Promise((resolve,reject)=>{
    resolve(10)
}) */

function sum(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },1000)
    })
}

/* Promise.all([
    sum(123,456),
    sum(789,123),
    sum(123,123)
]).then(r=>console.log(r)) */

/* Promise.allSettled([
    sum(123,456),
    sum(789,123),
    Promise.reject('hhh'),
    sum(123,123)
]).then(r=>console.log(r)) */

Promise.race([
    sum(123,456),
    sum(789,123),
    Promise.reject('hhh'),
    sum(123,123)
]).then(r=>console.log(r)).catch(r=>console.log(r))
