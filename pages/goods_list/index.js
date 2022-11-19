// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ]
  },
  // 标题的点击事件
  handleTabsItemChange(e){
    // console.log(e);
    // 获取被点击的标题索引
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);

    // 赋值
    this.setData({
      tabs
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  }
})