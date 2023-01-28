class myPromise{
    //创建一个变量来存储Promise的结果
     #result
    //创建一个变量来记录Promise的状态
    #state= 0

    constructor(executor){  //在constructor里，this就是当前对象
        //接收一个执行器作为参数
        executor(this.#resolve.bind(this),this.#reject.bind(this))
        //this.resolve.bind(this)   给resolve绑定当前实例的this
    }

    #resolve(value){
        //console.log(this)
        //console.log(value)
        if(this.#state==0){
            this.#result=value;
            this.#state=1
        }
        
    }
    #reject(reason){}

    //添加一个用来读取数据的then方法
    then(onFulfilled,onRejected){
        if(this.#state==1){
            onFulfilled(this.#result)
        }
    }

    // 把resolve和reject作为内部的私有方法
    //把类里面的实例方法作为参数传递出来
}

//创建实例
const mp = new myPromise((resolve,reject)=>{
    //console.log('executor被调用了')
    resolve("fulfilled")
    resolve('hello')
})
console.log(mp)
mp.then((result)=>{
    console.log(result)
},()=>{})