// pages/goods_detail/index.js
/* 
1、发送请求，获取信息
2、点击轮播图 预览大图
  1、给轮播图绑定点击事件
  2、调用小程序的api previewImage
*/
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id)

  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;
    this.setData({
      // 优化：将需要用到的数据领出来，其余不需要的就舍弃
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })

  },
  // 点击轮播图  放大预览
  handlePreviewImage(e){
    // 1 先构造要预览的图片数组 
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  }

 
})