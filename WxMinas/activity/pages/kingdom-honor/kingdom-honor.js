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
  code_width: 100,
  code_height: 100,
  codePath: '/images/scan-code.jpg',

  // 图片尺寸及位置
  bg_url: '/images/testImg.jpg',
  bg_width: 750,
  bg_height: 1125,

}


Page({
  /**
   * 页面的初始数据
   */

  data: {
    defaultImg: '/images/testExem.jpg',

    showInviteCard: false,
    inviteCardUrl: '',
    userInfo: {},

    current: 0,
    defaultName: '',
    killNum: '',

    windowHeight: '',
    hideOrShow: false,
    saveImg: true,
    isLoading: null,

    current_pos: [
      []
    ],

    imgUrls: [
      '/images/king-pre1.jpg', 
      '/images/king-pre2.jpg', 
    ],

    current_url:[
      '/images/king-mobile.jpg',
      '/images/king-pc.jpg',
    ],
    canvas_w:'',
    canvas_h:'',
    bg_width:[
      960, 1920
    ],
    bg_height:[
      540, 1080
    ],
    //移动端昵称位置
    mobile_name:{
      pos1:[
        34, 65
      ],
      pos2:[
        314, 254
      ]
    },
    //pc端昵称位置
   name_pos: [
        100, 150
    ],
    //pc端数字位置
    num_pos:{
      pos1: [
          360, 342
      ],
      pos2: [
          930, 803
      ]
    }

  },

  //绑定信息输入
  setName: function (e) {
    this.setData({
        defaultName: e.detail.value
    })
  },
  setNumber: function (e) {
    this.setData({
        killNum: e.detail.value
    })
  },

  swiper: function (e) {
    const that = this.data
    this.setData({
      current: e.detail.current,
      canvas_w: that.bg_width[e.detail.current],
      canvas_h: that.bg_height[e.detail.current]
    })
    console.log(e.detail.current)
    console.log(that.canvas_w)
    console.log(that.canvas_h)
  },

  // 关闭按钮
  close: function () {
    this.setData({
      hideOrShow: false
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
  // 图片加载提示
  isLoading: function () {
    if (this.isLoading) {
      wx.showLoading({
        title: '加载中',
      })
    }
    else {
      wx.hideLoading()
    }
  },
  //生成图片
  goTest: function (e) {
    var _this = this
    var _check = function () {
      let localPath = defaultOptions.portraitPath;

      if (!!localPath) {
        // callback(localPath);
        _this._doMakeAchieveCard(defaultOptions, function (path) {
          _this.setData({
            inviteCardUrl: path,
          })
        })
      } else {
        setTimeout(_check, 50);
      }

    }
    _check();
    // }
  },

  //预览图片
  previewImage: function (event) {
    wx.previewImage({
      urls: [event.currentTarget.dataset.imageUrl]
    })
  },

  _doMakeAchieveCard: function (options, callback) {
    console.log(options)
    const _this = this
    const that = this.data
    try {
      //背景图
      let cardOptions = options;
      let ctx = wx.createCanvasContext('marriged');
      ctx.drawImage(that.current_url[that.current], 0, 0, that.bg_width[that.current], that.bg_height[that.current]);


      // 提醒用户输入姓名
      if (that.current === 0){
          this.setData({
              hideOrShow: true,
              isLoading: true
          })
      }else if (that.killNum == ' ' || that.killNum == '' || that.killNum == null || that.killNum == undefined) {
        wx.showToast({
          title: '命中数要填数字哦',
          icon: 'none',
          duration: 2500
        })
      } else{
        this.setData({
          hideOrShow: true,
          isLoading: true
        })
      }

      //文字信息
      const textSize = that.windowWidth / 0.67 * 0.08
      console.log(that.current)
      switch (that.current) {
        // 移动端截图
        case 0:
          ctx.setFontSize(30)
          ctx.setFillStyle('#fff')
          ctx.setTextAlign('left')
          console.log(321)
          console.log(that.mobile_name.pos1[1])
          ctx.fillText(that.defaultName, that.mobile_name.pos1[0], that.mobile_name.pos1[1])
          ctx.save()
          ctx.setFontSize(14)
          ctx.setFillStyle('#c2b660')
          ctx.setTextAlign('left')
          ctx.fillText(that.defaultName, that.mobile_name.pos2[0], that.mobile_name.pos2[1])
          break;
          // pc端截图
        case 1:
          ctx.setFontSize(56)
          ctx.setFillStyle('#ffffff')
          ctx.setTextAlign('left')
          ctx.fillText(that.defaultName, that.name_pos[0], that.name_pos[1])
          ctx.save()
          ctx.setFontSize(40)
          ctx.setFillStyle('#fffefa')
          ctx.setTextAlign('left')
          ctx.fillText(that.killNum, that.num_pos.pos1[0], that.num_pos.pos1[1])
          ctx.save()
          ctx.setFontSize(26)
          ctx.setFillStyle('#542b29')
          ctx.setTextAlign('left')
          ctx.fillText(that.killNum, that.num_pos.pos2[0], that.num_pos.pos2[1])
          break;
        default:
          ctx.setFontSize(textSize)
          ctx.setFillStyle('#fff')
          ctx.setTextAlign('left')
          ctx.fillText(that.defaultName, cardOptions.nickname_pos[0], cardOptions.nickname_pos[1])
      }

      //二维码
    // ctx.drawImage(options.codePath, that.canvas_w - cardOptions.code_width, that.canvas_h - cardOptions.code_height, cardOptions.code_width, cardOptions.code_height);

      //图片输出
      ctx.draw(false, function (res) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.bg_width[that.current],
          height: that.bg_height[that.current],
          destWidth: that.bg_width[that.current],
          destHeight: that.bg_height[that.current],
          canvasId: 'marriged',
          success: function (res) {
            _this.setData({
              isLoading: false
            })
            console.log(res.tempFilePath);
            wx.hideLoading();
            callback(res.tempFilePath);

          }
        })
      })
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  },
  //回首页
  goHomePage: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  //邀请朋友
  onShareAppMessage: function (res) {
    return {
      // title: this.data.userInfo.nickName+'叫你一起来玩！',
      title: '敢不敢来吃鸡呀？',
      path: '/pages/testYouself/testYouself',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //保存图片
  savePic: function (e) {
    const that = this.data
    wx.showModal({
      title: '提示',
      content: '确定保存图片？',
      success: function (res) {
        if (res.confirm) {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: that.bg_width[that.current],
            height: that.bg_height[that.current],
            canvasId: 'marriged',
            success: function (res) {
              util.savePicToAlbum(res.tempFilePath)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const _that = this.data
    // 初始化图片尺寸
    this.setData({
        canvas_w: _that.bg_width[_that.current],
        canvas_h: _that.bg_height[_that.current]
    })
    console.log(_that.current)
    console.log(_that.canvas_w)
    console.log(_that.canvas_h)
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
