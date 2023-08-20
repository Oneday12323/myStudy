<template>

 <div class="box">
    <div class="group-container">
        <div v-for="(item) in Group" :key="item" class="group-item">
            <component v-bind:is="item.component" />
        </div>
    </div>
    <div >
        <div v-for="(item) in Single" :key="item" class="single-container">
            <component v-bind:is="item.component" />
        </div>
    </div>
 </div>

</template>

<script>
import HelloWorld from './HelloWorld.vue'
import aA from './aA.vue'

export default {
    data() {
        return {
            arr:[
                    {
                        type:'group',
                        arrItem:[
                            {component: 'HelloWorld'},
                            {component: 'aA'},
                        ],
                    },
                    {
                        type:'single',
                        arrItem:[
                            {component: 'aA'},
                            {component: 'HelloWorld'},
                        ],
                    },
            ]
        }
    },
    components:{
        HelloWorld,
        aA,
    },
    computed: {
        Group(){
            const newObj =  this.arr.filter(item => {
                if(item.type === 'group'){
                    return item
                }
            })
            console.log('newObj',newObj);
            return newObj[0].arrItem    
        },
        Single(){
            const newObj =  this.arr.filter(item => {
                if(item.type === 'single'){
                    return item
                }
            })
            console.log('newObj',newObj);
            return newObj[0].arrItem
        },
    }, 
}
</script>
<style scoped>
.box{
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: olivedrab;
    padding-top: 10px;
    border-radius: 10px;
}
.group-container{
    width: 200px;
    height: 100px;
    background-color: aqua;
    border-radius: 10px;
    margin-bottom: 20px;
}
.single-container{
    width: 200px;
    height: 100px;
    background-color: pink;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    /* 解决父子元素margin塌陷问题 */
}
</style>