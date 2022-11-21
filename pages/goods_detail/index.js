// pages/goods_detail/index.js
/* 
1、发送请求，获取信息
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    console.log(goods_id);
    this.getGoodsDetail(goods_id)

  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.setData({
      goodsObj
    })

  }

 
})