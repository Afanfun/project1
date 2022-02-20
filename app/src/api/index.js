// 当前这个模块:API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";
// 三级联动的接口 
// /api/product/getBaseCategoryList   get请求  无参数
// 发请求: axios发请求返回结果是Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner接口
export const reqGetBannerList = ()=> mockRequests.get('/banner');
// 获取floor数据
export const reqFloorList = ()=> mockRequests.get('/floor');

// 获取搜索模块数据 地址: /api/list 请求方式:POST  需要带多参数
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});

// 获取产品详情页的接口 URL:/api/item/{ skuId }  请求方式:GET
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

// 将产品添加到购物车中(或者更新某一个产品的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }   方法:POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId }/${skuNum }`,method:"post"})

// 获取购物车列表数据的接口
// URL:/api/cart/cartList    GET
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物产品的接口
// URL:/api/cart/deleteCart/{skuId}  方法:delete
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}   方法:GET
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
// URL: /api/user/passport/sendCode/{phone}   方法:GET
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册接口
// URL: /api/user/passport/register  方法:PST
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

// 登录接口
// URL: /api/user/passport/login  方法:POST
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

// 获取用户的信息,需要带着用户的token向服务器要用户信息
// URL: /api/user/passport/auth/getUserInfo   方法:GET
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
// URL: /api/user/passport/logout  方法:GET
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
// URL: /api/user/userAddress/auth/findUserAddressList  方法:GET
export const reqAddressInfo =()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息
// URK: /api/order/auth/trade 方法:GET
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单的借口
// URL: /api/order/auth/submitOrder?tradeNo={tradeNo}   方法:POST
export const reqSubmitOReder = (tradeNo,data) =>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息
// URL: /api/payment/weixin/createNative/{orderId}   方法:GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单状态
// URL: /api/payment/weixin/queryPayStatus/{orderId}   方法:GET
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心我的订单列表
// URL: /api/order/auth/{page}/{limit}    方法:GET
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})