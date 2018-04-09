// pages/marry/marry.js
import util from '../../utils/util'

var defaultOptions = {

  // 头像尺寸及位置
  head_width: 115,
  head_height: 115,
  head_pos: [320, 45],
  portraitPath: '',

  // 用户名尺寸及位置
  nickname_pos: [20, 186],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  // 二维码尺寸及位置
  code_pos: [560, 560],
  code_width: 150,
  code_height: 150,
  codePath: '/images/gao_qr_code_1.jpg',

  // 图片尺寸及位置
  bg_url: '/images/love.jpg',
  bg_width: 750,
  bg_height: 750,

}


Page({
  /**
   * 页面的初始数据
   */

  data: {
    defaultImg: '/images/examplLove.jpg',

    showInviteCard: false,
    inviteCardUrl: '',
    userInfo: {},

    followText: [
        "我也要玩",
        "搜索“搞嘢吧”"
    ],

    windowHeight: '',
    hideOrShow: false,
    saveImg: true,
    isLoading: null,


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
    var _this = this;
    const that = this.data
    // 弹出层开关
    this.setData({
      hideOrShow: true,
      isLoading: true
    })
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
      ctx.drawImage(cardOptions.bg_url, 0, 0, cardOptions.bg_width, cardOptions.bg_height);



      //文字信息
      const textSize = that.windowWidth / 0.67 * 0.22
      ctx.setFontSize(textSize)
      ctx.setFillStyle('#333')
      ctx.setTextAlign('center')
      ctx.fillText(Math.floor(Math.random() * (20 - 10) + 10), 375, 330)
      ctx.fillText(Math.floor(Math.random() * (8 - 2) + 2), 375, 588)

      // 引导使用
      ctx.setFontSize(24)
      ctx.setFillStyle('#969595')
      ctx.setTextAlign('center')
      ctx.fillText(that.followText[0], cardOptions.bg_width * 0.88, cardOptions.bg_height * 0.90)
      ctx.fillText(that.followText[1], cardOptions.bg_width * 0.88, cardOptions.bg_height * 0.90 + 40)

      // 头像
      ctx.save(); // 保存当前ctx的状态
      //设置圆半径
      let radius = 55;
      ctx.arc(375, 100, radius, 0, 2 * Math.PI); //画出圆
      //确定圆的范围
      ctx.stroke();
      ctx.clip(); //裁剪上面的圆形
      ctx.drawImage(defaultOptions.portraitPath, cardOptions.head_pos[0], cardOptions.head_pos[1], cardOptions.head_width, cardOptions.head_height);// 在刚刚裁剪的园上画图
      ctx.restore(); // 还原状态


      //二维码
      //ctx.drawImage(options.codePath, cardOptions.code_pos[0], cardOptions.code_pos[1], cardOptions.code_width, cardOptions.code_height);

      //图片输出
      ctx.draw(false, function (res) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: cardOptions.bg_width,
          height: cardOptions.bg_height,
          destWidth: cardOptions.bg_width,
          destHeight: cardOptions.bg_height,
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
      title: '听说有不少人想要约你？',
      path: '/pages/be-love/be-love',
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
    wx.showModal({
      title: '提示',
      content: '确定保存图片？',
      success: function (res) {
        if (res.confirm) {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: defaultOptions.bg_width,
            height: defaultOptions.bg_height,
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
          userInfo: res.userInfo
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