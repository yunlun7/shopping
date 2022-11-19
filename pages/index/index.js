// 引入用来发送请求的方法
import{request} from "../../request/index.js";

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航 数组
    catesList:[],
    // 楼层数组
    floorList:[]
  },

  onLoad() {

    // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题 
/*      wx.request({
       url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
       success: (result) => {
        // console.log(result);
          this.setData({
           swiperList: result.data.message
          
         }) 
       }
     }); */

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  
  // 获取轮播图数据
  getSwiperList(){
    request({url:"/api/public/v1/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList: result
      })
    })
  },

  // 获取分类导航数据
  getCateList(){
    request({ url: "/api/public/v1/home/catitems" })
    .then(result => {
      this.setData({
        catesList: result
      })
    })
  },

  // 获取楼层数据
  getFloorList(){
    request({ url: "/api/public/v1/home/floordata" })
    .then(result => {
      this.setData({
        floorList: result
      })
    })
  } 
})
