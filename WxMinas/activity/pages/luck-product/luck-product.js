// punch/pages/luck/luck.js

//设置一个default对象
var defaultOptions = {
  nickName: '',
  nickname_pos: [197, 909],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  code_pos: [405, 1021],
  code_width: 220,
  code_height: 220,
  codePath: '../../images/gao_qr_code_1.jpg',

  bg_url: '../../images/luck/bg_sort20180308105823.jpg',
  bg_width: 750,
  bg_height: 1334,

  wx_icon_width: 100,
  wx_icon_height: 100
}

//设置this指向pege
var that = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    x: wx.getSystemInfoSync().windowWidth,
    y: wx.getSystemInfoSync().windowHeight,
    // xml页面使用下列属性
    sex: '男',
    avatarUrl: '',
    nickName: '',
    userInfo: {},
    inviteCardUrl: '',
    bg: '',
    sendName: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //储存获得的名字
    setTimeout(function () {
      wx.setStorageSync('sendName', defaultOptions.nickName)
    }, 1)
  },
  onShow: function () {
    //储存获得的名字
    setTimeout(function () {
      wx.setStorageSync('sendName', defaultOptions.nickName)
    }, 1)
  },
  onReady: function (options) {
    that = this;
    var userInfo = {};
    var avatarUrl = {};

    //获得用户信息
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            userInfo = res.userInfo;

            //显示画布
            that.setData({
              showCanvas: true
            })
            //设置用户信息
            that.setData({
              userInfo: userInfo,
            })
            // 设置底部图片地址
            that.setData({
              avatarUrl: userInfo.avatarUrl
            })
            //设置底部用户名
            that.setData({
              nickName: defaultOptions.nickName
            })

            //设置顶部图片
            that.setData({
              bg: defaultOptions.bg_url
            })
          }
        });
      }
    });

  },
  changeName: function (e) {
    // console.log(e.detail.value)
    // console.log(e.detail)
    //防止没有输入还能跳转
    if (e.detail.value == "" || e.detail.value == undefined || e.detail.value == '') {
      defaultOptions.nickName = that.data.userInfo.nickName;
    } else {
      //console.log(e.detail.value)
      defaultOptions.nickName = e.detail.value;
      //console.log(defaultOptions.nickName)
    }
  },
  formSubmit: function (e) {

    //console.log(e)
    console.log(e.detail.value)
    // 判断输入值是否为用户原来的nickName
    if (e.detail.value.username == that.data.userInfo.nickName) {
      defaultOptions.nickName = e.detail.value.username
      //console.log(defaultOptions.nickName)
      //储存用户输入名称
      wx.setStorageSync('sendName', defaultOptions.nickName)
      //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
      //  wx.redirectTo
      wx.navigateTo({
        url: '../luck-content/luck-content',
        success: function (res) {

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      //判断用户输入是否为空
    } else if (e.detail.value.username == "" || e.detail.value.username == undefined || e.detail.value.username == '') {
      wx.showModal({
        title: '提示',
        content: '您还没有输入昵称',
        showCancel: false, //不显示取消按钮
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      console.log(e.detail.value.userName);
    } else {
      //console.log(defaultOptions.nickName)
      //储存用户输入名称
      setTimeout(function () {
        wx.setStorageSync('sendName', defaultOptions.nickName)
      }, 1)

      //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
      //  wx.redirectTo
      wx.navigateTo({
        url: '../luck-content/luck-content',
        success: function (res) {

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })

    }
  },
  onShareAppMessage: function (res) {

    //分享者名字拼接话术
    var message = '你的好友' + that.data.userInfo.nickName + ' 分享了你的狗年运势'
    
    return {
      title: message,
      path: '/pages/luck-product/luck-product',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})