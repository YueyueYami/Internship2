const {
    getSearchGoods
} = require('../../axios/api')
// pages/searchList/searchList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '', //搜索名称
        searchGoods: [], //商品展示列表
        tabNum: 0, //tab选中项
        goodListMode: true, //商品排列方式
    },
    switchListMode() { //切换排序模式
        this.setData({
            goodListMode: !this.data.goodListMode
        })
    },
    async zonghe() { //综合排序
        this.setData({
            tabNum: 0
        })
        const obj = {
            value: this.data.value
        }
        const resNewData = await getSearchGoods(obj)
        if (resNewData.code == 700) {
            return false
        } else {
            this.setData({
                searchGoods: resNewData.data.result
            })
        }
    },
    async xinpin() { //新品排序
        this.setData({
            tabNum: 1
        })
        const obj = {
            value: this.data.value,
            orderByMode: 'addedDown'
        }
        const resNewData = await getSearchGoods(obj)
        if (resNewData.code == 700) {
            return false
        } else {
            this.setData({
                searchGoods: resNewData.data.result
            })
        }
    },
    async xiaoliang() { //销量排序
        this.setData({
            tabNum: 2
        })
        const obj = {
            value: this.data.value,
            orderByMode: 'ordersDown'
        }
        const resNewData = await getSearchGoods(obj)
        if (resNewData.code == 700) {
            return false
        } else {
            this.setData({
                searchGoods: resNewData.data.result
            })
        }
    },
    async jiage() { //价格排序
        this.setData({
            tabNum: 3
        })
        const obj = {
            value: this.data.value,
            orderByMode: 'priceUp'
        }
        const resNewData = await getSearchGoods(obj)
        if (resNewData.code == 700) {
            return false
        } else {
            this.setData({
                searchGoods: resNewData.data.result
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        console.log(options);
        this.setData({
            value: options.value
        })
        if (options.value) {
            const resSearchGoods = await getSearchGoods(options)
            console.log(resSearchGoods);
            if (resSearchGoods.code == 700) {
                wx.showToast({
                    title: '暂无此数据，请换个关键词试试吧！！！',
                    icon: 'none'
                })
                return false
            } else {
                this.setData({
                    searchGoods: resSearchGoods.data.result
                })
            }
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