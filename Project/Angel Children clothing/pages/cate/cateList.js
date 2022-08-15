// pages/cate/cateList.js
const {
    getHomeCate, //获取分类
    getAllGood, //获取所有商品
} = require('../../axios/api.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cateList: [], //分类列表
        allGood: [], //所有商品
        cateGood: [],
        defaultCateId: 322169,
        value: '' //绑定输入框
    },
    //回车搜索
    value(e) {
        this.setData({
            value: e.detail.value
        })
    },
    search() {
        //搜索判空
        if (this.data.value == '') {
            wx.showToast({
                title: '请输入搜索内容'
            })
            return false
        }
        const obj = {
            text: this.data.value
        }
        let searchHistory = wx.getStorageSync('searchRecord')
        searchHistory.push(obj)
        wx.setStorageSync('searchRecord', searchHistory)
        //同步视图，清空输入框
        this.setData({
            value: ''
        })
        //跳转到搜索列表
        wx.navigateTo({
            url: '../searchList/searchList?value=' + obj.text,
        })
    },
    changeTab(e) {
        const arr = this.data.allGood.filter(item => {
            return item.categoryId == e.currentTarget.dataset.id
        })
        this.setData({
            cateGood: arr,
            defaultCateId: e.currentTarget.dataset.id
        })
    },
    toGoodInfo(e) {
        console.log(e);
        wx.navigateTo({
            url: '../goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.defaultCateId = parseInt(options.id)
        if (options.id) {
            this.setData({
                defaultCateId: this.defaultCateId
            })
        } else {
            this.setData({
                defaultCateId: 322169
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
        const resCateList = await getHomeCate()
        const resAllGood = await getAllGood()
        const arr = resAllGood.data.result.filter(item => {
            return item.categoryId == this.data.defaultCateId
        })
        this.setData({
            cateList: resCateList.data,
            allGood: resAllGood.data.result,
            cateGood: arr.reverse()
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
    onUnload() {},

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