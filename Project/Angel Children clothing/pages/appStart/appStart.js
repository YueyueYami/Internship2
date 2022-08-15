// pages/appStart/appStart.js
const {
    getAppBanner //首屏加载的接口
} = require('../../axios/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        appBannerList: [],
        btnShow: true
    },
    //切换开屏Banner触发的函数
    switchBanner(e) {
        if (e.detail.current == this.data.appBannerList.length - 1) {
            this.setData({
                btnShow: !this.data.btnShow
            })
        } else {
            this.setData({
                btnShow: true
            })
        }
    },
    //点击进入首页触发的函数
    toHome() {
        wx.setStorageSync('key', 1)
        wx.switchTab({
          url: '../home/home',
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
    async onShow() {
        if (wx.getStorageSync('key')) {
            wx.switchTab({
                url: '../home/home',
            })
        }
        const res = await getAppBanner()
        this.setData({
            appBannerList: res.data
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

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