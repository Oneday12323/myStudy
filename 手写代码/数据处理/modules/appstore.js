//设置弹出消息  父应用的
export default{
    namespaced:true,
    state:{
        msg:''
    },
    mutations:{
        SET_MSG_VALUE(state,data){
            state.msg=data
        }
    },
    actions:{
        setMsg({commit},data){
            commit('SET_MSG_VALUE',data)
        }
    }
}