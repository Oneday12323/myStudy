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
console.log(isGood([1,3,3,2]))