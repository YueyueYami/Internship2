// pages/my/my.js
const API = require('../../axios/api')
const AUTH = require('../../utils/auth')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //login
    login() {
        wx.getUserProfile({
            lang: 'zh_CN',
            desc: '实现微信登录',
            success(res) {
                wx.showToast({
                    title: '用户授权成功',
                })
                console.log(res.userInfo);
            },
            fail() {
                wx.showToast({
                    title: '用户取消授权',
                    icon: 'error'
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.authRegAndLogin()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})