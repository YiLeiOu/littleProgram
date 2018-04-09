
// 预设一个default对象
var defaultOptions = {
    nickName: '',
    nickname_pos: [197, 909],
    nickname_color: '#000000',
    nickname_size: 30,
    nickname_align: 'left',

    writeContent: '',
    writeContent_pos: [50, 200],
    writeContent_color: '#eeeeee',
    writeContent_size: 26,
    writeContent_align: 'left',

    signature: '',
    signature_pos: [197, 909],
    signature_color: '#000000',
    signature_size: 30,
    signature_align: 'center',

    time: '',
    time_pos: [197, 909],
    time_color: '#000000',
    time_size: 30,
    time_align: 'center',

    bg_url: '/images/mood/bg_mood.jpg',
    bg_width: 375,
    bg_height: 375,

    wx_icon: '',
    wx_icon_width: 100,
    wx_icon_height: 100
}

var that = null;

var imgsurl = [];

Page({
    /**
     * 页面的初始数据
     */
    data: {
        x: wx.getSystemInfoSync().windowWidth,
        y: wx.getSystemInfoSync().windowHeight,
        // xml页面使用下列属性
        avatarUrl: '',
        nickName: '',
        userInfo: {},
        showCanvas: '',
        inviteCardUrl: '',
        bg: '',
        showLoading: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获得上一页面传来的名字
        setTimeout(function () {
            defaultOptions.signature = wx.getStorageSync('keySignature');
            defaultOptions.writeContent = wx.getStorageSync('keyWriteContent');
            defaultOptions.time = wx.getStorageSync('keyTime');
            defaultOptions.wx_icon = wx.getStorageSync('keyAvatarUrl');
            console.log(defaultOptions.signature);
            console.log(defaultOptions.writeContent);
            console.log(defaultOptions.time);
            console.log(defaultOptions.wx_icon);
        }, 1);
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
                        console.log(res);
                        //获得用户信息
                        userInfo = res.userInfo;
                        //显示画布
                        that.setData({
                            showCanvas: true
                        })
                        //设置用户信息
                        that.setData({
                            userInfo: userInfo,
                        })
                        //下载微信头像
                        that.loadPortraitPath(defaultOptions.wx_icon)
                    }
                });

                defaultOptions.bg_url = 'https://img.wekuo.com/act_mina/img/bg_mood.png';
                // 把图片保存到本地
                wx.getImageInfo({
                    src: defaultOptions.bg_url.replace('http://', 'https://'),
                    success: function (res) {
                        defaultOptions.bg_url = res.path;
                        that.setData({
                            bg: res.path
                        })
                    }
                })

            }
        });


        //画出图片的方法
        var makeImg = function (imgUrl, callback) {
            try {
                //获得画布
                const ctx = wx.createCanvasContext('myCanvas');
                //获取设备宽高
                var canvasX = that.data.x;
                var canvasY = that.data.y;

                //画背景图
                ctx.drawImage(defaultOptions.bg_url, 1, 0, defaultOptions.bg_width, defaultOptions.bg_height);

                //画头像
                ctx.save(); // 保存当前ctx的状态
                //设置圆半径
                let radius = 60;
                ctx.arc(180, 90, radius, 0, 2 * Math.PI); //画出圆
                //确定圆的范围
                ctx.stroke();
                ctx.clip(); //裁剪上面的圆形
                ctx.drawImage(defaultOptions.portraitPath, 120, 20, defaultOptions.wx_icon_width * 1.3, defaultOptions.wx_icon_height * 1.3);// 在刚刚裁剪的园上画图
                ctx.restore(); // 还原状态

                ctx.setFillStyle('black')
                ctx.setFontSize(20);
                ctx.textBaseline = 'middle';//文本垂曲标的目的，基线位置
                ctx.setTextAlign('left');
                // ctx.fillText(defaultOptions.writeContent, defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1]);


                var text = defaultOptions.writeContent;
            
                if(text.length < 14) {
                    ctx.fillText(text, defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1]);
                } else if(text.length < 29){
                    ctx.fillText(text.slice(0,14), defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1]);
                    ctx.fillText(text.slice(15,28), defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1]+30);  
                } else {
                    var str = text.slice(30);
                    var str = '...';
                    ctx.fillText(text.slice(0, 14), defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1]);
                    ctx.fillText(text.slice(14, 28), defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1] + 30);
                    ctx.fillText(text.slice(28, 42), defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1] + 60);  
                    if(text.length>52) {
                        ctx.fillText(str, defaultOptions.writeContent_pos[0], defaultOptions.writeContent_pos[1] + 90);  
                    }
                    
                }
 
                ctx.setFontSize(12);      
                // ctx.setTextAlign('center');                          
                ctx.fillText(defaultOptions.signature, 283, 320);             
                ctx.fillText(defaultOptions.time, 283, 340);


                //输出图片
                ctx.draw(false, function () {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: defaultOptions.bg_width,
                        height: defaultOptions.bg_height,
                        destWidth: defaultOptions.bg_width,
                        destHeight: defaultOptions.bg_height,
                        canvasId: 'myCanvas',
                        success: function (res) {
                            //console.log(res.tempFilePath);
                            callback(res.tempFilePath)
                        }
                    })
                });

            } catch (err) {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }

        };


        //检查是否已经下载了微信头像
        var _check = function () {
            let localPath = defaultOptions.portraitPath;
            if (!!localPath) {
                makeImg(defaultOptions.portraitPath, function (path) {

                    //设置canvas生成的图片地址
                    defaultOptions.saveImgPath = path;
                    //console.log(defaultOptions.saveImgPath)

                    if (path) {
                        that.showLoading()
                    }

                    //隐藏画布,显示输出的图片
                    that.setData({
                        showCanvas: false,
                        inviteCardUrl: path
                    })

                })
            } else {
                setTimeout(_check, 100);
            }
        }

        _check()
    },
    //获得下载图片路径
    loadPortraitPath: function (imgUrl) {
        wx.getImageInfo({
            src: imgUrl.replace('http://', 'https://'),
            success: function (res) {
                defaultOptions.portraitPath = res.path;
            }
        })
    },
    //保存图片
    save: function () {
        //保存图片到手机
        wx.saveImageToPhotosAlbum({
            filePath: defaultOptions.saveImgPath,
            success(res) {
                console.log("saved");
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res) {
                wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    // loding设置
    showLoading: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 200
        });
    },
    cancelLoading: function () {
        wx.hideToast();
    },
    onShareAppMessage: function (res) {

        //分享者名字拼接话术
        var message = '你的好友' + that.data.userInfo.nickName + ' 分享了你的心情卡'

        return {
            title: message,
            path: '/pages/mood/mood',
            success: function (res) {
                // 转发成功
                console.log(res)
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    // 预览图片  
    previewImage: function (e) {
        var current = e.target.dataset.src;
        imgsurl.push(defaultOptions.saveImgPath)
        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: imgsurl // 需要预览的图片http链接列表  
        })
    },






})