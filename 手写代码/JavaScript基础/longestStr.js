//最长子序列
const longestStr=function(arr){
    let occ = new Set();
    let n = arr.length;
    let rig = -1,ans =0;
    for(let i = 0; i < n ;i++){
        if(i!=0){
            occ.delete(arr[i-1]); //从occ里第一个开始删除，直到删除掉当下重复的这个元素
        }
        while(rig+1<n && !occ.has(arr[rig+1])){
            occ.add(arr[rig+1]);
            rig++;
        }
        ans = Math.max(ans,rig+1-i); //从删除完重复元素前面的元素开始计算
    }
    return ans
}
let arr = [1,1,2,3,4,2,1]
console.log(longestStr(arr))