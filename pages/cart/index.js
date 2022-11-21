/* 
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress
*/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 点击 收货地址
  handleChooseAddress(){
    wx.chooseAddress({
      success:(result) => {
        console.log(result);
      }
    })
  }
})
  