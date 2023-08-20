/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
let l1 = new ListNode();
l1=[2,4,3]
let l2 = new ListNode();
l2 = [5,6,9]
const reverseList=(head)=>{
    let pre = null;
    let curr = head;

    while(curr){
        let next = curr.next;
        curr.next = pre;
        pre = curr;
        curr = next;
    }
    return pre;
}
const addTwoNumbers = function(l1, l2) {
    l1 = reverseList(l1);
    l2 = reverseList(l2);
    console.log(l1)
    let str1 = '';
    let head1= l1;
    while(head1){
        str1.concat(head1.val);
        head1=head1.next;
    }
    console.log(str1)
    let num1 = parseInt(str1);
    let str2 = '';
    let head2= l2;
    while(head2){
        str2.concat(head2.val);
        head2=head2.next;
    }
    
    let num2 = parseInt(str2);

    let res = num1+num2;
    //将数组转成链表 
      console.log(res);
};
addTwoNumbers(l1,l2)
/* 

*/

/**
 * 1. 函数功能：返回两个链表相加的头部
 */
/* public ListNode add(ListNode l1, ListNode l2, int carry) {
    // 2. 递归结束条件
    if (l1 == null && l2 == null && carry == 0) {
        return null;
    }

    // 3. 递归的等价关系式（不断缩写参数范围）
    // add(l1, l2, 0) = new ListNode(l1.val + l2.val) 的 next 指向 add(l1.next, l2.next, carry)的返回结点

    int val = carry;
    if (l1 != null) {
        val += l1.val;
        l1 = l1.next;
    }

    if (l2 != null) {
        val += l2.val;
        l2 = l2.next;
    }
    
    ListNode node = new ListNode(val % 10);
    node.next = add(l1, l2, val / 10);
    return node;
}` */