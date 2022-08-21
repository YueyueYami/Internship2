// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        IndexData: [{
                text: '全部'
            },
            {
                text: '待付款'
            },
            {
                text: '待发货'
            },
            {
                text: '待收货'
            },
            {
                text: '待评价'
            }
        ],
        detailIndex: 0,
        tabs: true
    },
    tabs(e) {
        console.log(e);
        let _this = this
        _this.setData({
            detailIndex: e.currentTarget.dataset.index,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.index);
        if (options.index == '5') {
            this.setData({
                tabs: false
            })
        } else {
            this.setData({
                detailIndex: options.index
            })
        }
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