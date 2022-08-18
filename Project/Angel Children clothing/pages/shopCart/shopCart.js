// pages/shopCart/shopCart.js
const {
    getShopCart, //获取购物车列表
    shopCartGoodSelect, //修改购物车商品选中状态
    shopCartGoodNum, //购物车商品数量改变
    removeShopCartGood //删除一条购物车的商品
} = require('../../axios/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        emptyShow: true,
        shopCartList: [],
        totalPrice: 0
    },
    //点击逛一逛，跳转到分类商品页面
    toGoodCate() {
        wx.switchTab({
            url: '../cate/cateList',
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
    //获取购物车数据
    async getShopCartList() {
        const shopCartData = {
            token: wx.getStorageSync('token')
        }
        const resShopCart = await getShopCart(shopCartData)
        if (resShopCart.code != 0) {
            return this.setData({
                shopCartList: []
            })
        } else if (resShopCart.code == 700) {
            this.setData({
                totalPrice: 0
            })
        } else {
            this.setData({
                shopCartList: resShopCart.data.items,
                totalPrice: resShopCart.data.price
            })
        }
        wx.setTabBarBadge({
            index: 3,
            text: resShopCart.data.number.toString()
        })
        if (this.data.shopCartList.length != 0) {
            this.setData({
                emptyShow: false
            })
        } else {
            this.render()
        }
    },
    //数量为0时，展示空状态，移除tabbar的数量
    async render() {
        const num = this.data.shopCartList.length - 1
        if (num == 0) {
            wx.removeTabBarBadge({
                index: 3
            })
            this.setData({
                emptyShow: true
            })
        }
    },
    //修改商品选中状态
    async goodCk(e) {
        const goodData = {
            key: e.currentTarget.dataset.key,
            selected: !e.currentTarget.dataset.selected,
            token: wx.getStorageSync('token')
        }
        const resGoodSelect = await shopCartGoodSelect(goodData)
        this.getShopCartList()
    },
    //修改商品数量
    async addGoodNum(e) { //数量加
        const goodData = {
            key: e.currentTarget.dataset.key,
            token: wx.getStorageSync('token'),
            number: e.currentTarget.dataset.number + 1
        }
        const resGoodNum = await shopCartGoodNum(goodData)
        this.getShopCartList()
    },
    async subGoodNum(e) { //数量减
        const goodData = {
            key: e.currentTarget.dataset.key,
            token: wx.getStorageSync('token'),
            number: e.currentTarget.dataset.number - 1
        }
        if (goodData.number == 0) {
            this.delGood(e)
            this.render()
        } else {
            const resGoodNum = await shopCartGoodNum(goodData)
            this.getShopCartList()
        }
    },
    //点击按钮删除购物车商品
    async delGood(e) {
        const removeData = {
            key: e.currentTarget.dataset.key,
            token: wx.getStorageSync('token')
        }
        const res = await removeShopCartGood(removeData)
        this.getShopCartList()
        await this.render()
    },
    async onShow() {
        this.getShopCartList()
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