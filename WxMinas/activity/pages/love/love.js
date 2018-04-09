
const util = require('../../utils/util.js')

// 预设一个default对象
var defaultOptions = {
    nickName: '',
    nickname_pos: [197, 909],
    nickname_color: '#eeeeee',
    nickname_size: 30,
    nickname_align: 'left',

    code_pos: [405, 1021],
    code_width: 200,
    code_height: 200,
    codePath: '/images/gao_qr_code_1.jpg',

    bg_url: '',
    bg_width: 750,
    bg_height: 1334,

    wx_icon_width: 100,
    wx_icon_height: 100,

    sendName: ''
};

Page({
    data: {
        sendName: '',
        swiperImgUrls: [
            '/images/love/example1.jpg',
            '/images/love/example2.jpg',
            '/images/love/example3.jpg',
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },

    onLoad: function (options) {
        var that = this;
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                console.log('成功获取用户信息');
                var userInfo = res.userInfo;
                var avatarUrl = 'userInfo.avatarUrl';
                var nickName = 'userInfo.nickName';
                that.setData({
                    [avatarUrl]: res.userInfo.avatarUrl,
                    [nickName]: res.userInfo.nickName
                });
            },
        });
        setTimeout(function () {
            wx.setStorageSync('sendName', defaultOptions.nickName)
        }, 1)
    },

    onReady: function (options) {
        var that = this;
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo;
                        console.log(userInfo);
                    }
                });
            }
        });
        setTimeout(function () {
            wx.setStorageSync('sendName', defaultOptions.nickName)
        }, 1)
    },
    goHome: function (e) {
        wx.navigateTo({
            url: '/pages/index/index'
        })
    },
    imgResource: function (e) {
        console.log("用户点击更换头像");
        // console.log(e);
    },
    changeName: function (e) {
        console.log(e);
        console.log(e.detail.value);
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
        console.log(e.detail.value);
        // 判断输入值是否为用户原来的nickName
        if (e.detail.value.username == this.data.userInfo.nickName) {
            defaultOptions.nickName = e.detail.value.username
            //console.log(defaultOptions.nickName)
            //储存用户输入名称
            wx.setStorageSync('sendName', defaultOptions.nickName)
            //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
            wx.navigateTo({
                url: '/pages/love-res/love-res',
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
                url: '../love-res/love-res',
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
    }

})




