// pages/mood/mood.js
var util = require('../../utils/util.js');

var defaultOptions = {
    signture: '',
    time: '',
    avatarUrl: ''
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',
        nickName: '',
        date: '',
        isNotClicked: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var date = util.formatTime(new Date()); //获取系统当前日期和时间
        var date = date.substring(0, 10);//用于提取字符串中介于两个指定下标之间的字符
        var date = date.replace(/\//g,'-');//把斜杠替换成-
        // console.log(date);
        defaultOptions.time = date;
        console.log(defaultOptions.time);

        wx.setStorageSync('keyTime', date);        
        
        // 获取用户头像/昵称
        wx.getUserInfo({
            success: function(res) {
                // console.log(res);
                var userInfo = res.userInfo;
                var avatarUrl = userInfo.avatarUrl;
                var nickName = userInfo.nickName;
                that.setData({
                    avatarUrl: avatarUrl,
                    nickName: nickName
                });
                defaultOptions.avatarUrl = avatarUrl;
                wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);               
            }
        });
        //通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            time: date
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setStorageSync('keySignature', defaultOptions.signature);
    },

    avatarClicked: function(e) {
        // if (!isAvatarClicked) {
        //     var randomNumber = Math.floor(Math.random() * 5 + 1);
        //     //让头像随机
        //     this.data.avatarUrl = 'https://img.wekuo.com/act_mina/img/mood_card/head/head' + randomNumber + '.jpg';
        //     this.setData({
        //         avatarUrl: this.data.avatarUrl
        //     })
        //     console.log(randomNumber);
        //     console.log(this.data.avatarUrl);
        //     console.log('头像被点击！');

        //     //将随机头像放到默认对象中，以便过后的本地缓存
        //     defaultOptions.avatarUrl = this.data.avatarUrl;
        //     wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);
        // } else {
        //     this.setData({
        //         avatarUrl: this.data.avatarUrl
        //     });
        //     defaultOptions.avatarUrl = this.data.avatarUrl;
        //     wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);
        // }
        
            var randomNumber = Math.floor(Math.random() * 5 + 1);
            //让头像随机
            this.data.avatarUrl = 'https://img.wekuo.com/act_mina/img/mood_card/head/head' + randomNumber + '.jpg';
            this.setData({
                avatarUrl: this.data.avatarUrl
            })
            console.log(randomNumber);
            console.log(this.data.avatarUrl);
            console.log('头像被点击！');

            //将随机头像放到默认对象中，以便过后的本地缓存
            defaultOptions.avatarUrl = this.data.avatarUrl;
            wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);

    },

    goHome: function(e) {
        wx.navigateTo({
            url: '/pages/index/index',
        });
    },

    nameChange: function(e) {
        var that = this;
        console.log(e);
        if(e.detail.value == undefined || e.detail.value == ""||e.detail.value == null) {
            // console.log(e);
            defaultOptions.signature = that.data.nickName;
            wx.setStorageSync('keySignature', defaultOptions.signature); 
                       
            // e.detail.value = that.data.nickName;
            // console.log(e.detail.value);
            // console.log(defaultOptions.signature);
        } else {
            defaultOptions.signature = e.detail.value;
            wx.setStorageSync('keySignature', defaultOptions.signature);        
        }
    },

    formSubmit: function(e) {
        var that= this;
        // console.log(e);
        // console.log(e.detail);
        // console.log(e.detail.value);
        wx.setStorageSync('keyWriteContent', e.detail.value.writeContent);
        wx.setStorageSync('keySignature', defaultOptions.signature);
        wx.setStorageSync('keyTime', defaultOptions.time);
        wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);       
               
        console.log(e);
        //输入的文本内容和昵称均不能为空
        if (e.detail.value.signature == this.data.nickName && e.detail.writeContent == !"" ) {
            defaultOptions.signature = e.detail.value.signature;
            wx.setStorageSync('keyWriteContent', e.detail.value.writeContent);
            wx.setStorageSync('keySignature', defaultOptions.signature);        
            wx.setStorageSync('keyTime', defaultOptions.time);     
            wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);        

            wx.navigateTo({
                url: '/pages/moodCard/moodCard',
            });        
        } else if (e.detail.value.signature == "" || e.detail.value.signature == undefined || e.detail.value.signature == null || e.detail.value.writeContent == "" || e.detail.value.writeContent == null || e.detail.value.writeContent == undefined) {
            wx.showModal({
                title: '提示',
                content: '内容或文字不能为空哦~',
                showCancel: false, //不显示取消按钮
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    }
                }
            });
        } else {
            defaultOptions.signature = e.detail.value.signature;
            wx.setStorageSync('keyWriteContent', e.detail.value.writeContent);
            wx.setStorageSync('keySignature', defaultOptions.signature);        
            wx.setStorageSync('keyTime', defaultOptions.time); 
            wx.setStorageSync('keyAvatarUrl', defaultOptions.avatarUrl);             
            wx.navigateTo({
                url: '/pages/moodCard/moodCard',
            });    
        }
    }


})