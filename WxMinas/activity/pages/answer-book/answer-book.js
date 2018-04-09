// pages/marry/marry.js
import util from '../../utils/util'

var defaultOptions = {

  // 头像尺寸及位置
  head_width: 75,
  head_height: 75,
  head_pos: [602, 1192],
  portraitPath: '',

  // 用户名尺寸及位置
  nickname_pos: [640, 1350],
  nickname_color: '#000000',
  nickname_size: 30,
  nickname_align: 'left',

  // 二维码尺寸及位置
  code_pos: [1130, 1500],
  code_width: 150,
  code_height: 150,
  codePath: '/images/gao_qr_code_1.jpg',

  // 图片尺寸及位置
  bg_url: '/images/answer-bg.jpg',
  bg_width: 1280,
  bg_height: 1659,

}


Page({
  
  data: {
    defaultImg: '/images/answer-pre.jpg',

    showInviteCard: false,
    inviteCardUrl: '',
    userInfo: {},

    textValue: '',

    windowHeight: '',
    hideOrShow: false,
    saveImg: true,
    isLoading: null,

    followText: [
        "我也要玩",
        "搜索“搞嘢吧”"
    ],

    answerList:[
        '千万别在这上面押宝',
        '采取一个大胆的态度',
        '听取专家的意见',
        '你会发现你自己无法妥协',
        '专注在你的家庭生活上吧',
        '研究，然后享受它',
        '当然',
        '它将无法预测',
        '绝对不',
        '带着好玩的好奇心去探索它',
        '最好等等看',
        '它好像是确定的',
        '趁早做',
        '对别人保密',
        '可能会发生一些令人吃惊的事作为结局',
        '答案可能会是以另一种语言形式来到你身边',
        '你将需要适当调整一下',
        '怀疑它',
        '它将带来好运',
        '要有点耐心',
        '你会发现你所需要知道的一切',
        '有一个实质性的链接，链接到另种情况',
        '你将会很开心你这样做了',
        '把它写下来 ',
        '千万别陷入你的个人感情',
        '改变你的焦点',
        '这时候非常不顺利',
        '用任何你能做到的方式去提升',
        '如果它是做得很好的，如果不是，就再也不要做它了',
        '这个时候不要要求更多',
        '避开第一个解决方案',
        '观察，看看会发生什么事',
        '它会影响到其他人怎么看你',
        '你会说了算',
        '以一个更加轻松的速度进行吧',
        '最好的解决方法可能不是显而易见的那个',
        '保持灵活性',
        '这不是你所能控制的',
        '享受体验',
        '谨慎地处理',
        '注意细节',
        '当你要去做的时候，小心行事',
        '毫无保留的把它说出来',
        '不要犹豫了',
        '它有着非常重要的意义',
        '更换一下重要事项的优先顺序',
        '这是一个做一个新计划的最好时机了',
        '继续前进',
        '做个为什么不这样的清单',
        '不要等待',
        '它将是你无法忘怀的事期望能够解决',
        '找出更多的选择',
        '履行你自己的义务',
        '稍后处理它',
        '跟随其他人的指引',
        '做一个为什么的清单',
        '冒险一试',
        '接受你习惯的改变',
        '你需要采取主动',
        '这可保证不了',
        '情况将会转变的非常快',
        '你将不得不妥协',
        '你需要更多的信息',,
        '相信你最起初的想法',
        '它将引起一场轰动',
        '可能会发生一些令人吃惊的事作为结局',
        '它将会带来好运',
        '灾难是极有可能的',
        '不要犹豫了',
        '它有着非常重要的意义',
        '更换一下重要事项的优先顺序',
        '这是一个做一个新计划的最好时机了',
        '继续前进',
        '做个为什么不这样的清单',
        '不要等待',
        '它将是你无法忘怀的事期望能够解决',
        '找出更多的选择',
        '履行你自己的义务',
        '稍后处理它',
        '跟随其他人的指引',
        '做一个为什么的清单',
        '冒险一试',
        '接受你习惯的改变',
        '你需要采取主动',
        '这可保证不了',
        '情况将会转变的非常快',
        '你将不得不妥协',
        '你需要更多的信息',
        '相信你最起初的想法',
        '它将引起一场轰动',
        '可能会发生一些令人吃惊的事作为结局',
        '它将会带来好运',
        '灾难是极有可能的',
        '迫切要求终止',
        '意识到太多的选择难入太少',
        '是的',
        '更加仔细地聆听，然后你将会知道',
        '答案就在你身边',
        '让它过去吧',
        '那将会是一种金钱的浪费',
        '全力以赴',
        '你不要真正的在意',
        '你需要考虑考虑其他方式',
        '从现在起的一年都没有什么所谓',
        '不要浪费你的时间了',
        '他可能是非凡的',
        '数到10，再问一次',
        '装作它已经是真的了',
        '布置优先次序将会是过程中一个必须的部分',
        '运用你的现象',
        '他一定会很好',
        '确保最好的决定，镇定下来',
        '等待',
        '当你行动的时候，你将需要不断弥补',
        '一笑置之',
        '别人也同样取决于你的选择',
        '你将会后悔的',
        '无可非议',
        '当然',
        '你知道现在比以前更好了',
        '相信你的直觉',
        '考虑到它的机会',
        '问问你的母亲',
        '可能，当你老的时候',
        '只能做一次',
        '可能', 
        '你会发现你所需要知道的一切',
        '观察，看看会发生什么事',
        '它会影响到其他人怎么看你',
        '你将会很开心你这样做了',
        ' 把它写下来',
        '这时候非常不顺利', 
        '用任何你能做到的方式去提升',
        '如果他是做得很好的，如果不是，就再也不要做它了',
        '这个时候不要要求更多',
        ' 放弃老的解决方案',
        '不，如果你独自一个人的话',
        '移除你自己的阻碍', 
        '最好把注意力放在你的工作上',
        '赌一下',
        '先把其他事完成',
        '你可能有敌对的人',
        '你太靠近看了',
        '情况还不清楚',
        '需要一个',
        '赌一下',
        '先让你自己休息一下',
        '这个机会不会很快再来',
        '再重新考虑你的方法',
        '它将是不可取的',
        '等待一个更好的提议',
        '早点定下来',
        '是的，但是别强迫',
        '去取得一个更加清晰的视野',
        '实际点',
        '节省你的能量吧',
        '冒险一试',
        '现在你可以',
        '不要做得过火了',
        '它将会扶持你',
        '你将为它付出代价',
        '它肯定会把事情变得有趣',
        '结果会是积极的',
        '不管什么',
        '他是肯定的',
        '它将是一种乐趣',
        '它是不确定的',
        '更加慷慨点',
        '你可能必须要丢下其他的东西',
        '不用担心',
        '对意外情况做好准备',
        '他没有什么意义',
        '告诉别人它对你意味着什么',
        '你可能必须要丢下其他的东西',
        '无论你做什么，结果都将会持续下去',
        '保持开放的心态',
        '制作计划的好时机',
        '他可能艰难，但是你会发现它是有价值的',
        '他是一个非常值得注意的麻烦',
        '采取一个大胆的态度',
        '听取专家的意见',
        '将会有一个阻碍需要去克服',
        '相关联的问题可能会浮出水面',
        '你肯定需要支持',
        '协助将会使你想成功发展',
        '合作将会是至关重要的',
        '不能失败',
        '温和的坚持会有回报的',
        '你将不会失望',
        '找出更多的提议',
        '他可能是一个木已成舟的事',
        '贯彻你的良好心愿',
        '花多点时间去决定',
        '不要被迫太快行动',
        '不要忽略那些显而易见的事',
        '你必须现在行动',
        '他不值得努力',
        '遵守规则',
        '别忘记了享受乐趣'
    ]
  },


  // 关闭按钮
  close: function () {
    this.setData({
      hideOrShow: false,
      textValue: '',
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

  textValue: function (e) {
    this.setData({
      textValue: e.detail.value
    })
  },

  //生成图片
  goTest: function (e) {
    var _this = this;
    const that = this.data

    if (that.textValue === '' || that.textValue === ' ' || that.textValue === null || that.textValue === undefined) {
      wx.showToast({
        title: '提个问题吧！',
        icon: 'none',
        duration: 2000
      })
    } else {
      // 弹出层开关
      this.setData({
        hideOrShow: true,
        isLoading: true
      })
    }


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

      // 定义换行函数，每5个字换一行
      const getAnswer = (content = '')=>{
        let result = []
        if (typeof content === 'string') {
            const contNum = 5
            for (let offset = 0, len = content.length; offset < len;) {
                let start  = offset
                let end = offset + contNum
                let block = content.substring(start, end)
                result.push(block)
                offset += contNum
            }
        }
        return result
      }


      //文字信息
      const textSize = that.windowWidth / 0.67 * 0.1
      const answerNum = Math.floor(Math.random() * that.answerList.length)
      ctx.setFontSize(textSize)
      ctx.setFillStyle('#fff')
      ctx.setTextAlign('center')

      // 定义文本的初始位置
      const answerCont_X = 640
      const answerCont_Y = 500
      // 定义行高
      const cont_line_height = 80

      let answerContent = getAnswer(that.answerList[answerNum])
      for (let i = 0, len = answerContent.length; i < len; i++) {
        let x = answerCont_X
        let y = answerCont_Y + cont_line_height * i
        ctx.fillText(answerContent[i], x, y)
      }

      // 画出用户昵称
      ctx.fillText(that.userInfo.nickName, cardOptions.nickname_pos[0], cardOptions.nickname_pos[1])

      // 头像
      ctx.drawImage(defaultOptions.portraitPath, cardOptions.head_pos[0], cardOptions.head_pos[1], cardOptions.head_width, cardOptions.head_height);

    // 引导使用
      ctx.setFontSize(24)
      ctx.setFillStyle('#969595')
      ctx.setTextAlign('center')
      ctx.fillText(that.followText[0], cardOptions.bg_width * 0.90, cardOptions.bg_height * 0.95)
      ctx.fillText(that.followText[1], cardOptions.bg_width * 0.90, cardOptions.bg_height * 0.95+40)
      //二维码
    //   ctx.drawImage(options.codePath, cardOptions.code_pos[0], cardOptions.code_pos[1], cardOptions.code_width, cardOptions.code_height);

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
      title: '哇！这”答案之页“好神奇啊',
      path: '/pages/answer-book/answer-book',
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
