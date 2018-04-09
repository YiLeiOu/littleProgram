// pages/luck/luck.js
var defaultOptions = {
  head_width: 100,
  head_height: 100,
  head_pos: [81, 871],

  nickname_pos: [197, 909],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  code_pos: [405, 1021],
  code_width: 220,
  code_height: 220,
  codePath: '/images/yhyh.jpeg',

  bg_url: '/images/invitr_bg_6.jpg',
  bg_width: 750,
  bg_height: 1334
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInviteCard: false,
    inviteCardUrl: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        _this.setData({
          userInfo: res.userInfo
        })
        defaultOptions.nickName = res.userInfo.nickName;
        _this.loadPortraitPath(res.userInfo.avatarUrl)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 关闭成就卡
  closeAchiveCard: function() {
    this.setData({
      showInviteCard: false
    })
  },
  loadPortraitPath: function(imgUrl) {
    wx.getImageInfo({
      src: imgUrl.replace('http://', 'https://'),
      success: function(res) {
        defaultOptions.portraitPath = res.path;
      }
    })
  },
  makeCard: function(e) {
    var _this = this;

    var _check = function() {
      let localPath = defaultOptions.portraitPath;

      if (!!localPath) {
        // callback(localPath);
        _this._doMakeAchieveCard(defaultOptions, function(path) {
          _this.setData({
            inviteCardUrl: path,
            showInviteCard: true
          })
        })
      } else {
        setTimeout(_check, 50);
      }
    }
    _check();
  },
  //预览图片
  previewImage: function(event) {
    wx.previewImage({
      urls: [event.currentTarget.dataset.imageUrl]
    })
  },
  _doMakeAchieveCard: function(options, callback) {
    console.log(options)
    try {
      let cardOptions = options;
      let ctx = wx.createCanvasContext('myCanvas');
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, cardOptions.bg_width, cardOptions.bg_height);
      ctx.drawImage(cardOptions.bg_url, 0, 0, cardOptions.bg_width, cardOptions.bg_height);

      //头像
      ctx.save();
      ctx.beginPath();
      let radius = cardOptions.head_width * 0.5;
      ctx.arc(cardOptions.head_pos[0] + radius, cardOptions.head_pos[1] + radius, radius, 0, 2 * Math.PI);
      ctx.setStrokeStyle('rgba(0,0,0,0)');
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(options.portraitPath, cardOptions.head_pos[0], cardOptions.head_pos[1], cardOptions.head_width, cardOptions.head_height);
      ctx.restore();

      //昵称
      ctx.setFontSize(cardOptions.nickname_size);
      ctx.setFillStyle(cardOptions.nickname_color);
      ctx.setTextAlign(cardOptions.nickname_align);
      ctx.fillText(options.nickName, cardOptions.nickname_pos[0], cardOptions.nickname_pos[1]);

      //二维码
      ctx.drawImage(options.codePath, cardOptions.code_pos[0], cardOptions.code_pos[1], cardOptions.code_width, cardOptions.code_height);

      //输出
      ctx.draw(false, function(res) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: cardOptions.bg_width,
          height: cardOptions.bg_height,
          destWidth: cardOptions.bg_width,
          destHeight: cardOptions.bg_height,
          canvasId: 'myCanvas',
          success: function(res) {
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
  }
})