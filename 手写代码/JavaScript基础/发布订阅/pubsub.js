//发布者
class Pub{
    
    //添加订阅者的方法
    constructor(){
        this.subscribers=[];
    }
    add(sub){
        this.subscribers.push(sub);
        console.log("添加了订阅者------",sub.name);   
    }
    //向订阅者发布事件
    publish(value){
        this.subscribers.forEach((item)=>{
            item.notify(value)
        })
    }
}


//订阅者
class Sub{
    // name;
    constructor(name){
        this.name=name
    }
    //订阅发布者
    subscribe(pub){
        pub.add(this)
    }
    notify(value){
        console.log(this.name+"订阅的"+value+"已送达");
    }
}

const pub1 = new Pub();

const sub1 = new Sub("星星子")
const sub2 = new Sub("韬韬子")

sub1.subscribe(pub1)
sub2.subscribe(pub1)

pub1.publish("牛奶");



