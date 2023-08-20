// 两数之和：输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 

const twoSum = (nums,target)=>{
    const map = new Map()
    for(let i = 0; i <nums.length;i++){
        if(map.has(nums[i])){
            return [map.get(nums[i]),i];
        }else{
            map.set(target-nums[i],i)
        }
    }
}
let arr = [2,7,11,15]
console.log(twoSum(arr,9))

// 为什么浏览器需要缓存机制
// 浏览器需要访问服务器获取数据