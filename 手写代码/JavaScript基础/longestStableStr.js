//最长稳定子序列
const longestStableStr = function(arr){
    
    let n = arr.length;
    let rig = 0 , ans = 0;
    for(let i = 1; i < n;i++){
        // if(Math.abs(arr[i]-arr[i-1])<=1){
        //     rig++; //记录当下的子序列的长度，还需要和之前的进行对比
        //     ans=Math.max(rig,ans)
        // }
        
        let tmp = Math.abs(arr[i]-arr[i-1])
        while( tmp<=1 ){  
            rig++;
        }
        ans=Math.max(ans,rig)
    }
    return ans
}
let arr = [2,4,2,3,2,4,4,1,2]
let arr1=[2,2,2,2,2]
console.log(longestStableStr(arr));
console.log(longestStableStr(arr1));
