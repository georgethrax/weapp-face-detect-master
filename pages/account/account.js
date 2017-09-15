//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo)
      /*
      avatarUrl:"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJoPbSOzKSSxsChVfP6G3QgianNGv0Z6EpWLRprDSoxAEPnHGmhaxjApNyHemicnVNQjmOBJlTXFu0g/0"
      city:"Haidian"
      country:"CN"
      gender:1
      language:"zh_CN"
      nickName:"李鑫"
      province:"Beijing"
      */
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
