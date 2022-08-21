// pages/capital/capital.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexData: [{
                text: '资金明细',
            },
            {
                text: '提现记录',
            },
            {
                text: '押金记录',
            },
        ],
        detailIndex: 0,
    },
    tabs(e) {
        console.log(e);
        let _this = this
        _this.setData({
            detailIndex: e.currentTarget.dataset.index,
        })
    },
    advance() {
        wx.navigateTo({
            url: './advance/advance',
        })
    },
    security() {
        wx.navigateTo({
            url: './security/security',
        })
    },
    recharge() {
        wx.navigateTo({
            url: './recharge/recharge',
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