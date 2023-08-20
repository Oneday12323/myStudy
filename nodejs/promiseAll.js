//Promise.all([...])的作用：同时返回多个promise的执行结果(无论成功或者失败)

function sum(a,b){
    return new Promise((resolve,reject) => {
        resolve(a+b)
    })
}
const res = Promise.all([
    sum(1,2).then(r=>{
        console.log(r);
    }),
    sum(2,3).then(r=>{
        console.log(r);
    })
])
console.log(res);

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


// 
let ans = [1,2,3,4,3,3,1]
let ccc = Math.max(...ans)
let bbb = [...new Set(ans)]
let ddd = ans.sort((a,b)=>a-b)
console.log(ccc,bbb,bbb.length,ddd)

const isGood = function(nums) {
    // 先找出最大元素
    let n = nums.length;
    let maxNum = Math.max(...nums);
    let res = [];
    for(let i = 1; i <= maxNum;i++){
        res.push(i)
    }
    res.push(maxNum);
    console.log(res,'ressss')
    // let m = [...new Set(nums)].length;
    let newArr = nums.sort((a,b)=>a-b);
    console.log(newArr,'qqqq')
    console.log(res == newArr);
    if(res.toString() === newArr.toString()) return true;
    return false;
};
isGood([1,3,3,2])