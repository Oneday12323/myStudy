//获得最快改变状态的promise的结果
// 在 Promise.myRace 的实现中,Promise.resolve(promises[i]).then(resolve, reject)这一行实现了以下两点:

// 3. 在第一个promise resolve或者reject时,就resolve/rejectrace Promise的结果。

// 4. 后续的promise结果不会再影响最终结果。

// 让我详细解释下:

// Promise.resolve(promises[i])这一步是为了兼容传入的promises数组中的元素可能不是promise的情况。

// 如果元素不是promise,将其包装成一个已resolve的promise。

// 然后对每个promise执行.then(resolve, reject)操作。

// 这就实现了一旦任意一个promise完成(resolve或reject),就会调用resolve或reject回调。

// 由于promise状态一旦改变就不会再改变,所以第一个完成的promise结果将决定race promise的结果。

// 后续promise的结果不会影响这个已经“锁定”的结果。

// 即使后续的promise最先完成,也不会覆盖之前已resolve/reject的race结果。

// 这样就实现了race的语义,获得最快改变状态的Promise结果。

// 所以Promise.resolve().then()这种机制很巧妙地实现了race的效果。



Promise.myRace = function(promises){
    return new Promise((resolve,reject) =>{
        for(let i = 0; i <promises.length;i++){
            Promise.resolve(promises[i]).then(resolve,reject)
        }
    })
}


const promise = new Promise((resolve,reject) => {
    setTimeout(resolve,1000,'one')
})

promise.then(res=>console.log(res))





// promise.race() 在以下几种情况下会比较有用:

// 1. 超时处理

// 可以通过race一个延迟的promise来实现超时:

// ```js
// const timeout = new Promise((_, reject) => {
//   setTimeout(() => reject('Timeout!'), 5000)
// })

// Promise.race([fetch('/api'), timeout])
//   .then(res => res.json())
//   .catch(err => ...) 
// ```

// 如果fetch()在5秒内没有结果,就会触发超时错误。

// 2. 竞争条件

// 当多个异步任务竞争,只取第一个返回结果的场景:

// ```js 
// const req1 = fetch('/api1') 
// const req2 = fetch('/api2')

// Promise.race([req1, req2]).then(res => {
//   // 取较快的请求结果
// })
// ```

// 3. 可取消的异步操作

// 通过向race传入一个可控制的promise,可以在需要时触发reject取消操作:

// ```js
// let abortCtrl = new AbortController();
// let signal = abortCtrl.signal;

// Promise.race([asyncOperation(), signal])
//   .catch(e => ...) 

// abortCtrl.abort() // 触发reject,取消操作
// ```

// 所以,race适用在需要快速响应、竞争场景以及可中止操作等情况。但不建议直接用于正常并发,因为它会舍弃较慢操作的结果。

