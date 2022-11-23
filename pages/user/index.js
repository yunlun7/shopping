// pages/user/index.js
Page({
  data: {
    userinfo:{},
    // 被收藏的商品的数量
    collectNums:0
  },
  onShow(){
    // 直接在缓存中查找就可以
    const userinfo=wx.getStorageSync("userinfo");
    const collect=wx.getStorageSync("collect")||[];
      
    this.setData({userinfo,collectNums:collect.length});
      
  }
})