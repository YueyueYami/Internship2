// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        searchRecord: []
    },
    value(e) {
        this.setData({
            value: e.detail.value
        })
    },
    //回车搜索
    search() {
        //搜索判空
        if (this.data.value == '') {
            wx.showToast({
                title: '请输入搜索内容'
            })
            return false
        }
        let obj = {
            text: this.data.value
        }
        //添加到历史记录
        this.data.searchRecord.push(obj)
        //同步视图，清空输入框
        this.setData({
            searchRecord: this.data.searchRecord,
            value: ''
        })
        //存储本地
        wx.setStorageSync('searchRecord', this.data.searchRecord)
        //跳转到搜索列表
        wx.navigateTo({
            url: '../searchList/searchList?value=' + obj.text,
        })
    },
    //删除历史记录
    delRecord(e) {
        const {
            index
        } = e.currentTarget.dataset
        this.data.searchRecord.splice(index, 1)
        wx.setStorageSync('searchRecord', this.data.searchRecord)
        this.setData({
            searchRecord: this.data.searchRecord
        })
    },
    //点击搜索历史进行搜索
    toSearch(e) {
        const searchStr = e.currentTarget.dataset.value
        wx.navigateTo({
            url: '../searchList/searchList?value=' + searchStr,
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
        //从本地加载历史记录
        if (wx.getStorageSync('searchRecord')) {
            this.setData({
                searchRecord: wx.getStorageSync('searchRecord')
            })
        } else {
            this.setData({
                searchRecord: []
            })
        }
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