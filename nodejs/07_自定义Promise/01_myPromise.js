// class myPromise{
//     //创建一个变量来存储Promise的结果
//      #result
//     //创建一个变量来记录Promise的状态
//     #state= 0

//     constructor(executor){  //在constructor里，this就是当前对象
//         //接收一个执行器作为参数
//         executor(this.#resolve.bind(this),this.#reject.bind(this))
//         //this.resolve.bind(this)   给resolve绑定当前实例的this
//     }

//     #resolve(value){
//         //console.log(this)
//         //console.log(value)
//         if(this.#state==0){
//             this.#result=value;
//             this.#state=1
//         }
        
//     }
//     #reject(reason){}

//     //添加一个用来读取数据的then方法
//     then(onFulfilled,onRejected){
//         if(this.#state==1){
//             onFulfilled(this.#result)
//         }
//     }

//     // 把resolve和reject作为内部的私有方法
//     //把类里面的实例方法作为参数传递出来
// }

// //创建实例
// const mp = new myPromise((resolve,reject)=>{
//     //console.log('executor被调用了')
//     resolve("fulfilled")
//     resolve('hello')
// })
// console.log(mp)
// mp.then((result)=>{
//     console.log(result)
// },()=>{})

const PROMISE_STATE = {
    PENDDING:0,
    FULFILLED:1,
    REJECTED:2,
}
class myPromise {
    //存储结果的变量
    #promiseResult;

    //存储状态的变量,默认为pendding
    #state = 0;

    //设置一个回调函数数组，用来处理异步数据的存储
    #callbacks = [];
    constructor(executor){
        executor(this.#resolve,this.#reject)
    }
    #resolve= (value) => {
        // if(this.#state === PROMISE_STATE.PENDDING){
        //     this.#promiseResult = value;
        //     this.#state = 1;
        //     console.log(this.#promiseResult);
        // } 
        //当状态不为0的时候，说明值已经被修改了，直接返回就可以
        if(this.#state !== PROMISE_STATE.PENDDING) return;
        this.#promiseResult = value;
        this.#state = 1;
        queueMicrotask(() => {
            this.#callbacks.forEach(cb => {
                cb();
            })
        })
    }

    #reject = () => {}

    //添加一个读取数据的then方法
    then = (onFulfilled,onRejected) => {
        return new myPromise((resolve,reject) => {
            // 谁将成为then返回的新promise中的数据？？？
            // then的参数回调函数的返回值吧
             /* 
                then的回调函数应该放在微任务队列中执行，而不是直接执行
            */
            if(this.#state === PROMISE_STATE.PENDDING){
                this.#callbacks.push(() => {
                    resolve(onFulfilled(this.#promiseResult))
                });
            }
            if(this.#state === PROMISE_STATE.FULFILLED){
                queueMicrotask(() => {
                    resolve(onFulfilled(this.#promiseResult))
                })
            }
            if(this.#state === PROMISE_STATE.REJECTED){
                
                resolve(onRejected(this.#promiseResult))
            }
        })

    }
}

const mp = new myPromise((resolve,reject)=>{
    // resolve('存储调用成功的数据')
    setTimeout(()=>{
        resolve('存储调用成功的数据')
    },1000)
    console.log('new一个实例对象，自动调用constructor()');
})
// mp.resolve('hhh')
mp.then(res=>{
    console.log(res,'第一次');
    return 123;
}).then(r => {
    console.log(r);
    return 456;
}).then(r => {
    console.log(r)
})
// mp.then(res=>{
//     console.log(res,'第二次');
// })
// promise能链式调用的前提：then返回的是一个promise