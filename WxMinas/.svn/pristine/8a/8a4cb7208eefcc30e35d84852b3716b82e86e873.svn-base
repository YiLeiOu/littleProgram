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

    defaultName: '',

    followText: [
        "我也要玩，搜索“搞嘢吧”"
    ],

    windowHeight: '',
    hideOrShow: false,
    saveImg: true,
    isLoading: null,

    critical: [
      '没有什么比家庭更重要',
      '没有什么比伴侣更重要',
      '没有什么比爱人更重要',
      '颜值决定了出轨的风险',
      '专一就是代名词！',
      '愿得一人心白首不分离',
      '心里仍还有个同桌的你',
      '你长得很有风险',
      '朋友说你长得很安全',
      '如无意外，白头到老',
      '老实说：你脱单了吗？',
      '三姑和六婆都替你急了',
      '唯另一半不可辜负',
      '爱到海枯石烂',
      '除非被偶像求婚',
      '只想一生跟Ta走',
      '静看半世红尘',
      '情与义，值千金',
      '情有多重，就有多绝'
    ]
  },

  //绑定信息输入
  setName: function (e) {
    this.setData({
        defaultName: e.detail.value

    })
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


      // 提醒用户输入姓名
      if (that.defaultName == '' || that.defaultName == null || that.defaultName == undefined) {
        wx.showToast({
          title: '姓名不能为空哦',
          icon: 'none'
        })
      } else{
        this.setData({
          hideOrShow: true,
          isLoading: true
        })
      }

      //文字信息
      const textSize = that.windowWidth / 0.67 * 0.08
      ctx.setFontSize(textSize)
      ctx.setFillStyle('#fff')
      ctx.setTextAlign('center')
      ctx.fillText(that.defaultName, cardOptions.nickname_pos[0], cardOptions.nickname_pos[1])
      ctx.fillText(that.critical[Math.floor(Math.random() * (that.critical.length) + 0)], 375, 845)

      ctx.setFontSize(textSize*2)
      ctx.setFillStyle('#14f814')
      ctx.setTextAlign('center')
      ctx.fillText(Math.floor(Math.random() * (25-8) + 8), 375, 530)


      // 引导使用
      ctx.setFontSize(26)
      ctx.setFillStyle('#969595')
      ctx.setTextAlign('center')
      ctx.fillText(that.followText[0], cardOptions.bg_width * 0.5, cardOptions.bg_height * 0.95)

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
      title: '要不要也来测测你的出柜指数？',
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
