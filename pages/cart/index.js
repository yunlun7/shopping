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
/*     wx.chooseAddress({
      success:(result) => {
        console.log(result);
      }
    }) */

/*     wx.getSetting({
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    }); */

    // 1、获取权限状态
    wx.getSetting({
      success: (result) => {
        // 2、获取权限状态 如果发现属性名很长.  都要使用[]形式来获取属性
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===true || scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1)
            }
          });
            
        }else{
          // 3、用户曾经拒绝过授予权限  先引导用户打开授权页面
          wx.openSetting({
            success: (result3) => {
              console.log(result3);
            }
          });
            
        }
      },
      fail: () => {},
      complete: () => {}
    });
      
      
  }
})
  