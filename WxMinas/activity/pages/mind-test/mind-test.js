// pages/marry/marry.js
import util from '../../utils/util'

var defaultOptions = {

  // 头像尺寸及位置
  head_width: 100,
  head_height: 100,
  head_pos: [81, 871],

  // 用户名尺寸及位置
  nickname_pos: [375, 150],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  // 二维码尺寸及位置
  code_pos: [300, 950],
  code_width: 150,
  code_height: 150,
  codePath: '/images/gao_qr_code_1.jpg',

  // 图片尺寸及位置
  bg_url: '/images/mind-test.jpg',
  bg_width: 750,
  bg_height: 1334,

}


Page({
  /**
   * 页面的初始数据
   */

  data: {
    defaultImg: '/images/mind-test.jpg',

    showInviteCard: false,
    inviteCardUrl: '',
    userInfo: {},

    defaultName: '',

   
    windowHeight: '',
    hideOrShow: false,
    saveImg: true,
    isLoading: null,
  },

  //绑定信息输入
  setName: function (e) {
    this.setData({
        defaultName: e.detail.value
        
    }) 
  },


  
  // 头像
  loadPortraitPath: function (imgUrl) {
    wx.getImageInfo({
      src: imgUrl.replace('http://', 'https://'),
      success: function (res) {
        defaultOptions.portraitPath = res.path;
      }
    })
  },
 
  // 去测试
  goTest: function () {
    wx.navigateTo({
      url: '/pages/mind-test-page/mind-test-page',
    })
  },
  //回首页
  goHome: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  //邀请朋友
  onShareAppMessage: function (res) {
    return {
      title: '做题时间到啦~',
      path: "/pages/mind-test/mind-test",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        })
      }
    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo,
          defaultName: res.userInfo.nickName
        })
        defaultOptions.nickName = res.userInfo.nickName;
        that.loadPortraitPath(res.userInfo.avatarUrl)
        // that.setData({
        //   defaultName: res.userInfo.nickName
        // })
      }
    })
    var scene_img = 'that.data.inviteCardUrl'     //这里添加图片的地址  
    that.setData({
      scene: scene_img
    })
    
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})