
// 同时发送异步代码的次数
let ajaxTimes=0;
export const request=(params)=>{
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }


  ajaxTimes++;
  // 再发送请求的时候，在出现这个效果，因此放在此处进行实现
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
    

  // 定义公共的url
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
     header:header,
     url:baseUrl+params.url,
     success:(result)=>{
       resolve(result.data.message);
     },
     fail:(err)=>{
       reject(err);
     },
    //  不管成功还是失败，都会执行的函数
     complete:()=>{
      ajaxTimes--;
      if(ajaxTimes===0){
        //  关闭正在等待的图标
        wx.hideLoading();
      }
     }
    });
  })
}