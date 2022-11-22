/* 
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

  2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
    1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
      scope 值 true 直接调用 获取收货地址
    2 假设 用户 从来没有调用过 收货地址的api 
      scope undefined 直接调用 获取收货地址
    3 假设 用户 点击获取收货地址的提示框 取消   
      scope 值 false 
      1、引导用户自己打开授权设置页面， 当当用户重新给与 获取地址权限的时候
      2、获取收货地址
    4 把获取到的收货地址 存入到 本地存储中
2 页面加载完毕
  0 onLoad  onShow 
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
3 onShow 
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
    1 num=1;
    2 checked=true;
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中
*/
import {getSetting, chooseAddress,openSetting} from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function(){
    // 1、获取缓存中的收获地址信息
    const address = wx.getStorageSync("address");
    // 1、获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart");
    // 2、给data赋值
    this.setData({
      address,
      cart
    })
      
  },

  // 点击 收货地址
  async handleChooseAddress(){
    try {
      // 1、获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2、判断权限状态
      if(scopeAddress===false){
        // 3、引导用户打开授权页面
        await openSetting();
      }
      // 4、调用获取收货地址的api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      // 5、存入到缓存中
      wx.setStorageSync("address", address);
        
    } catch (error) {
      console.log(error);
    }
  }
})
  