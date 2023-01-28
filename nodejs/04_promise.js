//Promise就是一个存储数据的对象
//但是由于Promise存取数据的方式特殊，所以可以直接将异步调用的结果存储到Promise中
/* 
    对Promise进行链式调用时
        后边的方法（then，catch）读取的是上一步的执行结果
            如果上一步的执行结果不是当前想要的结果
                则跳过当前的方法
*/
/* 
    当Promise出现异常时，而整个调用链当中没有出现catch，则异常会向外抛出
*/

const promise = new Promise((resolve,reject)=>{})  //这个箭头函数是一个执行器

function sum (a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },1000)
    })
}
sum(123,456).then((result)=>{
    console.log(result)
})


/* 
    Promise中的
        then
        catch
        finally
        -这三个方法都会返回一个新的Promise
*/
sum(1,2).then(result=>{
    console.log(result)
    return 5
})
        .then(result=>result+4)
        .then(result=>console.log(result))
//下一个then的回调函数的参数是上一个then的回调函数的返回值