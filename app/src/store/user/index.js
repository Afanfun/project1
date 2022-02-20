import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo, reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
// 登录与注册的模块
const state = {
    code:'',
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GTEUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 把仓库中相关用户信息清空,还有本地存储数据清空
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的接口,把验证码返回;;正常情况是后台把验证码返回到用户手机上
        let result = await reqGetCode(phone);
        // 正常下面不用写
        if(result.code==200){
            commit("GETCODE",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        };
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        };
    },
    // 用户登录  token :令牌
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // 服务器下发token,用户第一标识符(uuid)
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            // 用户已经登陆成功且获取到了token
            commit("USERLOGIN",result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        };
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            // 提交用户信息
            commit("GTEUSERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发一次请求,通知服务器清除服务器的token
        let result = await reqLogout()
        // action里面不能操作state,提交mutation修改state
        if(result.code == 200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        };
    },
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}