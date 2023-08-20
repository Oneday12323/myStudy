//中心扩展算法
function huiWen(s){
    let len = 1;
    //从每一个位置的mid出发，向两边扩散
    let maxLeft= 0;//记录最长回文子串的起点
    let maxRight = 0;//记录终点
    let maxLen=0; //记录最长回文子串的长度
    for(let mid = 0;mid <s.length;mid++){
        let left = mid-1;
        let right = mid+1;

        //1.向左侧扩展，直到超过边界或者遇到与中心字符不相等的情况跳出while循环
        while(left>=0 && s[left]==s[mid]){
            left--; //left与mid字符一致，继续向左移动
            len++;  //与mid字符一致，回文串字符长度加一
        }

        //2.向右侧扩展
        while(right<=s.length-1 && s[right]==s[mid]){
            right++;
            len++
        }

        //3.同时向左右两侧扩展
        while(left>=0 && right<=s.length-1 && s[left]==s[right]){
            left--;
            right++;
            len+=2
        }

        if(len>maxLen){
            maxLeft=left;
            maxRight=right;
            maxLen=len;
        }
        len=1
    }
    return s.substr(maxLeft+1,maxLen)
}
console.log(huiWen('acdbbdaa')); 