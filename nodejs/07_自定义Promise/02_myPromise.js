
const PROMISE_STATE={
    PENDING:0,
    FULFILLED:1,
    REJECTED:2
}
class myPromise{
    
    #state=PROMISE_STATE.PENDING
    #result

    //创建一个变量来存储回调函数
    //由于回调函数有多个，所以我们使用数组来存储回调函数
    #callbacks=[]

    constructor(executor){
        executor(this.#resolve,this.#reject)
    }

    #resolve=(value)=>{
        //console.log(value)
        //禁止值被重复修改
        //如果state值不为0，说明值已经被修改了，函数直接返回
        if(this.#state !== PROMISE_STATE.PENDING) return
        this.#result=value
        this.#state = PROMISE_STATE.FULFILLED
        //当resolve执行时，说明数据已经进来了，此时应该调用then的回调函数
        //作判断，如果callback有则调用，没有的话就不调用
        queueMicrotask(()=>{
            //this.#callback && this.#callback(this.#result)
            this.#callbacks.forEach(cb=>{
                cb()
            })
        })
    }
    #reject=(reason)=>{}

    then=(onFulfilled,onRejected)=>{

        //异步
        if(this.#state === PROMISE_STATE.PENDING){
            //此时Promise的状态为pending，说明数据还没有进入到promise中，即resolve还没被调用
            //this.#callback=onFulfilled //callback是一个属性，后面的数据会把前面的覆盖掉
            this.#callbacks.push(()=>{
                onFulfilled(this.#result) //当箭头函数执行时，onFulfilled()就会执行
            })
        }

        //同步
        else if(this.#state === PROMISE_STATE.FULFILLED){
            /* 
                目前来讲，then只能读取已经存储进Promise的数据，
                    而不能读取异步存储的数据
            */
            //onFulfilled(this.#result)
            //then的回调函数应该放在微任务队列中执行，而不是直接调用
            queueMicrotask(()=>{
                onFulfilled(this.#result)
            })
            /* 
                then里面能通过回调函数返回数据，resolve()一调用说明数据已经进来了，此时再去调用onFulfilled()
            */
        }
    }
}

const mp = new myPromise((resolve,reject)=>{
    //resolve(1)
    setTimeout(()=>{
        resolve('小丸子')
    })
})
console.log(mp)
mp.then((r)=>console.log("读取数据1",r))
mp.then((r)=>console.log("读取数据2",r))
