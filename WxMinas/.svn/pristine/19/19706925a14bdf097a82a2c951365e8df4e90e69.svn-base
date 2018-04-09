// pages/mind-test-page/mind-test-page.js
// pages/marry/marry.js
import util from '../../utils/util'
var defaultOptions = {

  // 头像尺寸及位置
  head_width: 110,
  head_height: 110,
  head_pos: [320, 0],
  portraitPath: '',

  // 用户名尺寸及位置
  nickname_pos: [375, 80],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  // 二维码尺寸及位置
  code_pos: [640, 1224],
  code_width: 110,
  code_height: 110,
  codePath: '/images/gao_qr_code_1.jpg',

  // 图片尺寸及位置
  bg_url: '/images/mind-test.jpg',
  bg_width: 750,
  bg_height: 1334,

}
Page({
    data: {

      // 图片尺寸
      bgImg: '/images/mind-test.jpg',
      bg_url: '/images/mind-test.jpg',
      bg_width: 750,
      bg_height: 1334,

      num: 0,
      clear: false,
      showOrHide: '',
      quetion: [
          '题一：你会选哪个?',
          '题二：一定要选其中一个当朋友的话，你会选谁?',
          '题三：如果你是一个合成的人，你会选择下列哪一个?',
          '题四：你会选择下列哪一种录像机?'
      ],
      selection: [
        [
          'A、你上厕所时被TA看到了',
          'B、TA上厕所时被你看到了'
        ],
        [
          'A、身高40公尺的超人',
          'B、身高15公分的一寸法师',
        ],
        [
          'A、大猩猩的脸，藤原纪香的身材',
          'B、松岛菜菜子的脸，企鹅的身材',
        ],
        [
          'A、只能快速放映的录像机',
          'B、只能慢速播放的录像机',
        ]
      ],
    // 穷
    position1: [
      [194, 734],
      [223, 743],
      [252, 752],
      [290, 762],
      [310, 768]
    ],
    // 好奇
    position2: [
      [556, 734],
      [524, 743],
      [502, 750],
      [476, 756],
      [454, 763]
    ],
    // 懒
    position3: [
      [481, 921],
      [470, 908],
      [455, 888],
      [429, 856],
      [417, 841]
    ],
    // 义气
    position4: [
      [262, 928],
      [276, 910],
      [291, 891],
      [312, 864],
      [328, 844]
    ],

      showInviteCard: false,
      inviteCardUrl: '',
      userInfo: { },
      imageUrl: [],
      defaultName: '',
      title: '',


      windowHeight: '',
      hideOrShow: false,
      saveImg: true,
      isLoading: null,

      followText: [
          "我也要玩",
          "搜索“搞嘢吧”"
      ],
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
        title: '结果计算中',
      })
    }
    else {
      wx.hideLoading()
    }
  },
  // 选项框绑定
  radioChange: function (e) {
    var _this = this;
    const that = this.data

    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      num: that.num += 1,
      clear: false
    })
    if (that.num === that.quetion.length) {
      this.setData({
        isLoading: true,
        showOrHide: true
      })
      var _check = function () {
        let localPath = defaultOptions.portraitPath;
        
        if (!!localPath) {
          // callback(localPath);

          console.log('10')
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
      let ctx = wx.createCanvasContext('myCanvas');
      ctx.drawImage(cardOptions.bg_url, 0, 0, cardOptions.bg_width, cardOptions.bg_height);

      


      //文字信息
      const textSize = that.windowWidth / 0.67 * 0.08
      ctx.setFontSize(textSize)
      ctx.setFillStyle('#fff')
      ctx.setTextAlign('center')
      ctx.fillText(that.defaultName, cardOptions.nickname_pos[0], cardOptions.nickname_pos[1])

      ctx.setFontSize(24)
      ctx.setFillStyle('#333')
      ctx.setTextAlign('center')
      ctx.fillText('人性中的善良天使', 375, 1280)

      // 引导使用
      ctx.setFontSize(24)
      ctx.setFillStyle('#969595')
      ctx.setTextAlign('center')
      ctx.fillText(that.followText[0], cardOptions.bg_width * 0.90, cardOptions.bg_height * 0.95)
      ctx.fillText(that.followText[1], cardOptions.bg_width * 0.90, cardOptions.bg_height * 0.95 + 40)

      //二维码
      //ctx.drawImage(options.codePath, cardOptions.code_pos[0], cardOptions.code_pos[1], cardOptions.code_width, cardOptions.code_height);

      // 保存当前状态
      ctx.save()
      
      
      // 不规则图形
      const randomNum1 = Math.floor(Math.random() * that.position1.length + 0)
      console.log(randomNum1)
      const randomNum2 = Math.floor(Math.random() * that.position1.length + 0)
      console.log(randomNum2)
      const randomNum3 = Math.floor(Math.random() * that.position1.length + 0)
      console.log(randomNum3)
      const randomNum4 = Math.floor(Math.random() * that.position1.length + 0)
      console.log(randomNum4)

      ctx.moveTo(that.position1[randomNum1][0], that.position1[randomNum1][1])
      ctx.lineTo(375, Math.floor(Math.random() * (690 - 614) + 614))
      ctx.lineTo(that.position2[randomNum2][0], that.position2[randomNum2][1])
      ctx.lineTo(that.position3[randomNum3][0], that.position3[randomNum3][1])
      ctx.lineTo(that.position4[randomNum4][0], that.position4[randomNum4][1])

      ctx.setFillStyle('#fef398')
      ctx.setGlobalAlpha(0.5)
      ctx.fill()

      

      //图片输出
      ctx.draw(false, function (res) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: cardOptions.bg_width,
          height: cardOptions.bg_height,
          destWidth: cardOptions.bg_width,
          destHeight: cardOptions.bg_height,
          canvasId: 'myCanvas',
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
  
  //邀请朋友
  onShareAppMessage: function (res) {
    return {
      title: '做题时间到啦~',
      path: '/pages/mind-test/mind-test',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //保存图片
  saveImg: function (e) {
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
            canvasId: 'myCanvas',
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
    this.setData({
      defaultName: options.title
    })   
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