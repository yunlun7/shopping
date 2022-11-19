// pages/category/index.js
import { request } from "../../request/index.js";
Page({
      /* 
    0 web中的本地存储和 小程序中的本地存储的区别
      1 写代码的方式不一样了 
        web: localStorage.setItem("key","value") localStorage.getItem("key")
    小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
      小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
    1 先判断一下本地存储中有没有旧的数据
      {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送新请求 
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
     */

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的菜单数据
    rightMenuList:[],
    // 被点击的左侧的菜单
    currentIndex:0,
    // 右侧的滚动条
    scrollTop:0

  },
  // 接口返回的数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();

    // 1、获取本地的存储数据
    const Cates = wx.getStorageSync("cates");

    // 2、判断
    if(!Cates){
      // 不存在  发送请求获取数据
      this.getCates();
    } else{
      // 有旧的数据  定义过期时间
      if(Date.now() - Cates.time > 1000*10){
        // 重新发送数据
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
      let leftMenuList  = this.Cates.map(v => v.cat_name);
      let rightMenuList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
      }
    }
  },

  // 获取分类数据
  getCates(){
    request({
      url:"/api/public/v1/categories"
    })
    .then(res => {

      this.Cates = res;

      // 把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(), data:this.Cates})


      // 构造左侧的大菜单数据
      let leftMenuList  = this.Cates.map(v => v.cat_name);
      // 构造右侧的商品数据
      let rightMenuList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    })
  },

  // 左侧的点击事件
  handleItemTap(e){
    // console.log(e);

    // 1、获取索引
    const {index} = e.currentTarget.dataset;

    // 2、给data中的currentIndex复制
    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightMenuList,
      scrollTop:0
    })
  }
})