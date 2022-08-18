// pages/cate/cateList.js
const {
    getHomeCate, //获取分类
    getAllGood, //获取所有商品
    addToShopCart, //添加商品到购物车
    getShopCart, //购物车商品列表
    getGoodInfo, //商品详情
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
        value: '', //绑定输入框
        skuList: [], //商品规格列表
        goodImg: '',
        goodSkuBox: false, //是否展示弹出框
        buyNum: 1, //有sku的商品默认是1
        skuData: [],
        goodId: 0,
        goodInfo: {}, //商品详情
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
    // tab栏切换
    changeTab(e) {
        const arr = this.data.allGood.filter(item => {
            return item.categoryId == e.currentTarget.dataset.id
        })
        this.setData({
            cateGood: arr,
            defaultCateId: e.currentTarget.dataset.id
        })
    },
    // 跳转到商品详情
    toGoodInfo(e) {
        wx.navigateTo({
            url: '../goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
        })
    },
    //点击按钮添加到购物车
    async addGoodToShopCart(e) {
        const goodObj = {
            goodsId: e.currentTarget.dataset.id,
            number: 1,
            token: wx.getStorageSync('token')
        }
        const resAddToShop = await addToShopCart(goodObj)
        const resShopCart = await getShopCart({
            token: wx.getStorageSync('token')
        })
        wx.setTabBarBadge({
            index: 3,
            text: resShopCart.data.number.toString(),
        })
    },
    //点击加号按钮添弹出有sku规格的商品
    async addSkuGoodToShopCart(e) {
        //商品详情内Sku规格
        const resGoodSku = await getGoodInfo(e.currentTarget.dataset.id)
        console.log(resGoodSku.data.basicInfo);
        this.setData({
            goodImg: e.currentTarget.dataset.img,
            skuList: resGoodSku.data.properties,
            goodSkuBox: true,
            goodId: e.currentTarget.dataset.id,
            goodInfo: resGoodSku.data.basicInfo
        })
    },
    //点击商品属性动态添加边框,获取pid以及id
    changeSku(e) {
        const id = e.currentTarget.dataset.id
        const pid = e.currentTarget.dataset.pid
        let newSkuArr = this.data.skuList.find(item => item.id == pid)
        newSkuArr.childsCurGoods.forEach(item => {
            if (item.id == id) {
                item.active = true
            } else {
                item.active = false
            }
        })
        const skudata = {
            optionId: pid,
            optionValueId: id,
        }
        this.data.skuData.push(skudata)
        this.setData({
            skuList: this.data.skuList,
            skuData: this.data.skuData
        })
    },
    // 选择商品数量
    onChange(e) {
        this.setData({
            buyNum: e.detail
        })
    },
    //点击添加到购物车实现添加
    async addShopCart() {
        const res = await addToShopCart({
            sku: JSON.stringify(this.data.skuData),
            token: wx.getStorageSync('token'),
            goodsId: this.data.goodId,
            number: this.data.buyNum
        })
        this.setData({
            goodSkuBox: false,
            buyNum: 1,
            skuData: []
        })
        const resShopCart = await getShopCart({
            token: wx.getStorageSync('token')
        })
        wx.setTabBarBadge({
            index: 3,
            text: resShopCart.data.number.toString(),
        })
    },
    // 关闭弹出框
    onClose() {
        this.setData({
            goodSkuBox: false
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