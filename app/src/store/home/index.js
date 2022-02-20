import {reqCategoryList,reqGetBannerList,reqFloorList} from "@/api";
// home模块的小仓库
const state = {
    // state中的数据默认初始值不要瞎写,服务器返回数组,起始值就是数组
    // 要根据接口返回值初始化
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // floor组件的数据
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用,向服务器反请求,获取数据
    /*categoryList(){
        let result = reqCategoryList().then((res)=>{
            console.log(res);
        });
    }*/
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
        // console.log(result);
    },
    // 获取首页轮播图数据
    async getBannerList({commit}){
        let results = await reqGetBannerList();
        if(results.code==200){
            commit("GETBANNERLIST",results.data)
        }
        // console.log(results);
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code ==200){
            // 提交mutation
            commit("GETFLOORLIST",result.data)
        } 
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}