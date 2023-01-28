const promise = new Promise((resolve,reject)=>{
    console.log(1)
    console.log(2)
})

promise.then(()=>{
    console.log(3)
})
console.log(4)  //1,2,4

//promise.then是微任务，他需要promise内部的状态发生变化，才能读取到数据，
//这里promise的状态一直为pending，所以读取不到3