<template>

 <div>
      
      <button @click.prevent="show">查看</button>
 </div>

</template>

<script setup lang='ts'>
import {ref,reactive,readonly,toRef,toRaw} from 'vue'
const man = reactive({
  name:"apu",
  age:29,
  hobby:"movie"
})

const show=()=>{
 
  console.log(man,toRaw(man))
}
</script>
<style scoped>

</style>