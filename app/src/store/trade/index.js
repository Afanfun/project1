import {reqAddressInfo,reqOrderInfo} from '@/api';
const state = {
    address:[],
    order:{},
};
const mutations = {
    GETADDRESSINFO(state,address){
        state.address = address;
    },
    GETORDERINFO(state,order){
        state.order = order;
    },
};
const actions = {
    // 获取用户地址信息
    async getAddressInfo({commit}){
        let result = await reqAddressInfo();
        if(result.code==200){
            commit('GETADDRESSINFO',result.data);
        }
    },
    // 获取订单页面
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code==200){
            commit('GETORDERINFO',result.data);
        }
    },
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters,
}