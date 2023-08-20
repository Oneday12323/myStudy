//类似于数组，也是一组数据的集合------和数组最大的区别是，set数据结构不会用来存储重复的值
/* 
    应用场景：
        电商网站的搜索功能，用户搜索完成之后，网站要记录用户搜索的关键字，
        方便用户下次直接点击历史关键字就可以搜索了
        搜索历史关键字可以使用set数据结构

    Set本身是一个构造函数，用来生成set数据结构
    Set函数可以接收一个数组作为参数，用来初始化
*/

// class Set{
//     constructor(){
//         this.items={};
//         this.size=0;
//     }

//     has(element){
//         return element in this.items
//     }
//     add(element){
//         if(!this.has(element)){
//             this.items[element]=element;
//             this.size++;
//         }
//         return this;
//     }
//     delete(element){
//         if(this.has(element)){
//             delete this.items[element];
//             this.size--
//         }
//         return this;
//     }
//     clear(){
//         this.items={};
//         this.size=0
//     }

//     //values()返回一个包含Set中所有值的数组。
//     values(){
//         let values=[];
//         for(let key in this.items){
//             if(this.items.hasOwnProperty(key)){
//                 values.push(key)
//             }
//         }
//         return values;
//     }
// }

// const set1 = new Set();
// set1.add(1)
// set1.add(1)
// set1.add(2)
// set1.add(3)
// console.log(set1.delete(2));
// console.log(set1.add(4));
// console.log(set1);
// console.log(5/2);

const reverseString = (s)=>{
    let n = (s.length-1)/2
    
    for(let i =0; i <n ;i++){
        [s[i],s[s.length-1-i]]=[s[s.length-1-i],s[i]]
    }
    return s;
}
const s = ["h","e","l","l","o"]
let s2 = reverseString(s).join('#')
console.log(s2);

// concat slice  toString join     sort splice reverse
//会修改原数组的方法：
/* 
    splice
    reverse
    sort
*/
let fruits = ["Banana", "Orange", "Apple", "Mango"];
//fruits.splice(2, 0, "Lemon", "Kiwi")

let newFruits= fruits.concat('xiao')
let newFruits2=fruits.slice(1,3)   
let newFruits3= fruits.toString()
let newFruits4= fruits.sort()

console.log(newFruits);
console.log(newFruits2); //slice(1,3) 该方法会从开始参数选取元素，直到结束参数（不包括）为止。["Orange", "Apple"]
console.log(newFruits3);
console.log(newFruits4);

console.log(fruits);

/* 
提取部分字符串:
    有三种提取部分字符串的方法：
        slice(start, end)
        substring(start, end)
        substr(start, length)
*/

