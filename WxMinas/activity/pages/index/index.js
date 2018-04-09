//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 小工具相关数据
        toolList: [
            {
                pageUrl: "/pages/marry/marry",
                toolTitle: '结了个婚',
                toolIconUrl: '/images/icon/love.png',
                toolBgColor: '#f2fcf1',
                titleColor: '#6f9838',
                introColor: '#85c861',
                introduce: '一不小心我们领证啦啦啦啦',
            },
            {
                pageUrl: "/pages/luck-product/luck-product",
                toolTitle: '狗年运势',
                toolIconUrl: '/images/icon/dog.png',
                toolBgColor: '#faeff3',
                titleColor: '#e74f80',
                introColor: '#f4b3c9',
                introduce: '桃花运？财运？了解一下',
            },
            {
                pageUrl: "/pages/testYouself/testYouself",
                toolTitle: '出轨指数',
                toolIconUrl: '/images/icon/test.png',
                toolBgColor: '#e9fdfb',
                titleColor: '#2cb28f',
                introColor: '#a5e0dc',
                introduce: '关于出轨这件事，你有多坚定？？？',
            },
            {
                pageUrl: "/pages/be-love/be-love",
                toolTitle: '想约就约嘛',
                toolIconUrl: '/images/icon/yue.png',
                toolBgColor: '#e0fdff',
                titleColor: '#20b2ff',
                introColor: '#afe00c',
                introduce: '呀！原来那么多人想约我噢',
            },
            {
                pageUrl: "/pages/answer-book/answer-book",
                toolTitle: '迷之答案',
                toolIconUrl: '/images/icon/answer-book.png',
                toolBgColor: '#fae003',
                titleColor: '#e74080',
                introColor: '#34b0c3',
                introduce: '嘿，你要的答案在这呢？！',
            },
            {
                pageUrl: "/pages/mind-test/mind-test",
                toolTitle: '假的弱点',
                toolIconUrl: '/images/icon/mind-map.png',
                toolBgColor: '#f2fcf1',
                titleColor: '#6f9838',
                introColor: '#85c861',
                introduce: '你是人性中善良的天使呢？',
            },
            {
                pageUrl: "/pages/love/love",
                toolTitle: '被爱源由',
                toolIconUrl: '/images/icon/reasonloved.png',
                toolBgColor: '#FFEFDB',
                titleColor: '#FF1493',
                introColor: '#F08080',
                introduce: '你知道我为什么爱你吗？',
            },
            // {
            //     pageUrl: "/pages/kingdom-honor/kingdom-honor",
            //     toolTitle: '今晚吃鸡',
            //     toolIconUrl: '/images/icon/game.png',
            //     toolBgColor: '#e0dcdc',
            //     titleColor: '#ac7171',
            //     introColor: '#5d2c2c',
            //     introduce: '大吉大利，今晚吃鸡',
            // },
            {
                pageUrl: "/pages/little-funny/little-funny",
                toolTitle: '九宫刷图',
                toolIconUrl: '/images/icon/pic.png',
                toolBgColor: '#fbfce0',
                titleColor: '#53534d',
                introColor: '#91918b',
                introduce: '来，收图时间到啦',
            }
        ],

        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        imgUrls: [
            {
                url: '/pages/marry/marry',
                imgUrl: '/images/marriage-bg.jpg'
            },
            {
                url: '/pages/luck-product/luck-product',
                imgUrl: '/images/luck/bg_sort20180308105823.jpg'
            }

        ],

        introduceText: 'sdffdsfsdfsdsdfssdfs',

        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000

    },


    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    onShareAppMessage: function (res) {
        return {
            title: '我发现这个小程序太搞了，你也来看看！',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
