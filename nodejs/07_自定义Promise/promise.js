const PROMISE_STATE = {
    PENDDING:0,
    FULFILLED:1,
    REJECTED:2,
}
class MyPromise{
    //存储结果
    #promiseResult;

    //存储状态
    #state = PROMISE_STATE.PENDDING

    //异步存储时的回调函数数组
    #callbacks = [];

    constructor(executor){
        executor(this.#resolve,this.#reject);
    }

    #resolve = (val) => {
        if(this.#state !== PROMISE_STATE.PENDDING) return 
        this.#promiseResult = val;
        this.#state = PROMISE_STATE.FULFILLED;
        queueMicrotask(() => {
            this.#callbacks.forEach((cb)=>{
                cb();
            })
        })
    }

    #reject = (val) => {
        this.#promiseResult = val;
    }

    then = (onFulfilled,onRejected) => {
        return new MyPromise((resolve,reject)=>{
            if(this.#state === PROMISE_STATE.PENDDING){
                this.#callbacks.push(()=>{
                    resolve(onFulfilled(this.#promiseResult))
                })
            }else if(this.#state === PROMISE_STATE.FULFILLED){
                queueMicrotask(()=>{
                    resolve(onFulfilled(this.#promiseResult))
                })
            }
        })
    }
}

const mp = new MyPromise((resolve,reject) => {
    setTimeout(()=>{
        resolve('存进去一个Fulfilled数据吧')
    },1000)
})
mp.then((res)=>{
    console.log(res);
    return 123
},()=>{}).then(r => {
    console.log(r);
})