// pages/goodInfo/goodInfo.js
const {
    getGoodInfo
} = require('../../axios/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 1216006, //默认展示id
        goodInfo: {}, //基本数据
        content: '', //富文本内容
        skuList: [], //商品参数
        buyShow: true, //购买时弹出层
    },
    buyShowTago() {
        console.log(1);
        this.setData({
            buyShow: true
        })
    },
    onClose() {
        this.setData({
            buyShow: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options != {}) {
            this.setData({
                id: parseInt(options.id)
            })
        } else {
            this.setData({
                id: 1216006
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
    async onShow() {
        const res = await getGoodInfo(this.data.id)
        this.setData({
            id: this.data.id,
            pics: res.data.pics2,
            goodInfo: res.data.basicInfo,
            skuList: res.data.skuList,
            content: res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        })
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