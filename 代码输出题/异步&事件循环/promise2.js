Promise.resolve(1)
.then(2)
.then(Promise.resolve(3))
.then(console.log)
Promise.resolve(5).then(console.log)
console.log(console.log)
//then方法接收的参数是函数，而如果传递的不是一个函数，
//他实际上会将其解释为then(null),这就会导致前一个promise的结果传递下面