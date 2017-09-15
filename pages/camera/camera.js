//index.js
//获取应用实例
//var app = getApp()
//获取 utils
var utils=require('../../utils/util.js')
//获取 constan
var Constant = require('../../utils/constant.js');
Page({
  onShareAppMessage:function(){
    return {
      title: '益见清心2017·向菁菁展示你的笑脸',
      path: '/pages/camera/camera',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  data: {
    modalHidden:true,
    title_space:' \n ',
    tips:'请打开一张照片',
    localUrl: Constant.CHIPINGGUO
  },
  //分析按钮
  uploadImage: function() {
    var that = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          localUrl:tempFilePaths[0],
        })
        console.log('choose:'+that.data.localUrl)
        // wx.showLoading({
        //   title: '鉴定中，请稍候'
        // })
        
        //调试贴图库用
        // return
        wx.showToast({
          title:'分析中，请稍后',
          icon:'loading',
          duration:5000         
        })

        wx.uploadFile({
          //人脸检测API
          url:Constant.DETECTION_URL,
          //url:"https://upload.qiniu.com",
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFilePaths[0],
          name: 'image_file',
          formData:{
            //key:"123",
            api_key: Constant.DETECTION_API_KEY,
            api_secret: Constant.DETECTION_API_SECRET,
            //image_file:tempFilePaths[0],
            return_landmark:0,
            //return_attributes:"gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity",
            return_attributes:"gender,age,smiling,headpose",
          },
          success: function(res){
            console.log(res.data)
            var data = JSON.parse(res.data)
            wx.hideToast()  
            if (!data.faces || data.faces.length==0){
              that.setData({
                  tips:'未检测到人脸。请重新打开照片进行分析，或直接发布到首页'
              })
            }
            else{
              that.setData({
                //tips:'检测到人脸'
                tips:utils.formatFace(data.faces)
              })
            }
            
            //do something
          },
          fail:function(res){
            console.log(res)
            wx.hideToast() 
            wx.showToast({
              title:'服务器忙，请稍后',
              icon:'loading',
              duration:1000
            })         
            that.setData({
              //tips:'检测到人脸'
              tips:'分析失败。请重新打开照片进行分析，或直接发布到首页'
            })
          }
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
  },
  onlongclick: function () {
        this.setData({ modalHidden: false });
  },
  // 保存
  onSaveClick: function (event) {
      var mUrl = "";
      if (event.currentTarget.dataset.url != null)
          mUrl = event.currentTarget.dataset.url;
      console.log("download：" + mUrl);
      saveImage(mUrl);
  },
  // 取消
  onCancelClick: function (event) {
      this.setData({ modalHidden: true });
  },
  publistImage: function (event) {
      var that = this
      var localUrl = that.data.localUrl      
      if (localUrl == Constant.CHIPINGGUO){
        console.log('试图发布吃苹果')
        wx.showModal({
          title: '提示',
          content: '请先打开一张照片',
          showCancel: false,          
        })
        return
      }
      this.setData({
        modalHidden: false
      })
  },
  //按下了发布按钮
  onPublishClick: function (event) {
      //TODO: 上传文件到qiniu，在qcloud数据库中更新相应记录
      var that = this
      var localUrl = that.data.localUrl 
      console.log(localUrl)
      console.log(Constant.PUBLISH_URL)
      console.log(Math.floor(new Date().getTime() / 1000) + 60)
      that.setData({
          modalHidden:true
      })
      
      wx.showToast({
        title:'发布中，请稍后',
        icon:'loading',
        duration:5000         
      })    
      wx.uploadFile({
          //图床api
          url:Constant.PUBLISH_URL,
          //url:"https://upload.qiniu.com",
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: localUrl,
          name: 'file',
          formData:{
            //key:"123",
            deadline: Math.floor(new Date().getTime() / 1000) + 60,
            from: "file",
            aid: Constant.PUBLISH_AID,
            Token: Constant.PUBLISH_TOKEN,
            httptype:1
          },
          success: function(res){            
            var data = JSON.parse(res.data)
            console.log(res.data)
            wx.hideToast()
            that.setData({
              tips:"发布成功"
            })
            //do something
          },
          fail:function(res){
            console.log(res)
            wx.hideToast() 
            that.setData({
              tips:'发布失败，请重试'
            })
          }
      })  
    },
    fail: function(res) {
      // fail
      console.log(res)
      wx.hideToast() 
      wx.showToast({
        title:'发布失败，请重试',
        icon:'loading',
        duration:500
      })         
      that.setData({
        //tips:'检测到人脸'
        tips:'发布失败，请重试'
      })
    }
})
  