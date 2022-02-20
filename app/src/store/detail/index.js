import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api';
import { Promise } from 'core-js';
// 封装游客身份模块-----生成一个随机的字符串(不能再变了)
import {getUUID} from '@/utils/uuid_token'
const state ={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
    
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的结果
        // 加入购物车以后发请求,前台将参数带给服务器
        // 服务器写入数据成功,并没有返回其他的数据,只是code=200代表成功
        // 因为服务器没有返回其余数据,因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            // 代表加入购物车成功
            return "非空字符串 ok"
        }else{
            // 加入购物车失败
            return Promise.reject(new Error('false'))
        }
    }
}
const getters ={
    // 路径导航简化的数据
    categoryView(state){
        // 有个假报错; 空对象的categoryView属性时undefined
        return state.goodInfo.categoryView||{};
    },
    // 产品信息简化的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}