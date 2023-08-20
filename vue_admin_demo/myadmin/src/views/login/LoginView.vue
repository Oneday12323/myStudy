<template>
    <div class="login">
        <div class="divItem">
            <div v-for="v in menuList" :key="v.type" @click="toPage(v)" >
            {{ v.txt }}
        </div>
        </div>
        <el-form ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名">
                <el-input type="userName" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" />
            </el-form-item>
            <el-form-item label="重复密码" v-show="type==='register'">
                <el-input type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">{{type==='login'?"登录":"注册"}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const menuList = reactive([
    { txt: "登录", current: true, type: "login" },
    { txt: "注册", current: false, type: "register" }])

const type = ref("login")

const toPage=(v)=>{
    menuList.forEach(item=>{
        item.current=false
    })
    v.current=true

    //修改保存点击的状态
    type.value=v.type
}
</script>

<style lang="scss" >
/* 如果style标签上加了scoped 则不能作用在全局上  下面设置的html那些就不会起作用 */
.login {

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}
.divItem{
    display: flex;
    justify-content: center;
    div{
        width: 100px;
        
    }
}

.demo-ruleForm {
   
    margin: 100px auto;
    el-form-item {
        el-input{
            width: 300px;
        }
        
    }

}
</style>