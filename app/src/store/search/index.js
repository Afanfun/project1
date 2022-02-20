import {reqGetSearchInfo} from "@/api";
// search模块的小仓库
const state = {
    // 仓库初始化状态
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        // 当前reqGetSearchInfo这个函数在调用获取服务器数据的时候,至少传递一个参数
        // params形参:是当用户派发action的时候,第二个参数传递过来的,至少是个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    },
};
// 计算属性 主要作用是简化仓库中的数据,[后面组件在获取数据就方便了]
const getters = {
    // 当前形参state,是当前仓库的state,并非大仓库state
    goodsList(state){
        // 服务器数据回来是一个数组;假如网络很慢应该返回undefined,所以至少要给个空数组以防万一
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}