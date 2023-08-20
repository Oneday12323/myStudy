//菜单数据以及折叠状态
export default {
    namespaced:true,
    state:{
        //设置两个初始状态
        is_collapse:false, //折叠
        menu:[], //菜单数据
    },
    mutations:{
        //在此设置修改state里数据的方法
        SET_MENU(state,data){
            state.menu=data;
        },
        SET_COLLAPSE_STATUS(state,data){
            state.is_collapse=data;
        }
    },
    actions:{
        //在此进行提交，将修改操作提交到mutatios以修改state
        setMenu({commit},data){
            commit('SET_MENU',data)
        },
        setCollapseStatus({commit},data){
            commit('SET_COLLAPSE_STATUS',data)
        }
    }
}