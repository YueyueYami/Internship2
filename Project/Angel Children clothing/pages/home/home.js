//引入首页需要的接口
const {
    getHomeBanner, //首页banner图
    getHomeCate, //首页的分类模块
    getNoticeBar, //首页资讯的接口
    getGoodsClass, //获取不同活动区块的商品
    getAllGood, //获取所有商品
    getUserToken, //根据code获取token
} = require('../../axios/api')
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        homeBannerList: [], //首页轮播图
        homeCateList: [], //首页分类栏
        NoticeBar: '', //资讯栏
        miaoshaGoods: [], //秒杀商品
        baokuanGoods: [], //爆款商品
        kanjiaGoods: [], //砍价商品
        pintuanGoods: [], //拼团商品
        allGood: [], //所有商品
        page: 1, //加载商品页数
        pageSize: 5 //每页加载5条
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //转到搜索
    toSearch() {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    //转到分类
    toCate(e) {
        const id = e.currentTarget.dataset.id
        wx.reLaunch({
            url: '../cate/cateList?id=' + id,
        })
    },
    //点击查看商品详情
    toGoodInfo(e) {
        wx.navigateTo({
            url: '../goodInfo/goodInfo?id=' + e.currentTarget.dataset.id,
        })
    },
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    // 优化首页加载
    youHua(data) {
        if (data.code == -3) {
            this.onPullDownRefresh()
            return false
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        const resBanner = await getHomeBanner() //获取首页banner图
        const resCate = await getHomeCate() //获取首页分类图
        const resNotice = await getNoticeBar() //获取资讯栏提示
        //获取秒杀类商品
        const miaoshaData = {
            miaosha: true
        } //秒杀类商品传值
        const resMiaosha = await getGoodsClass(miaoshaData) //获取秒杀类商品数据
        //获取爆款类商品
        const baokuanData = {
            recommendStatus: 1
        } //爆款类商品传值
        const resBaokuan = await getGoodsClass(baokuanData) //获取爆款类商品数据
        //获取砍价商品
        const kanjiaData = {
            kanjia: true
        } //砍价类商品传值
        const resKanjia = await getGoodsClass(kanjiaData) //获取砍价类商品
        //获取拼团商品
        const pintuanData = {
            pingtuan: true
        } //拼团商品传值
        const respintuan = await getGoodsClass(pintuanData) //获取拼团商品
        this.youHua(resMiaosha || resBaokuan || resKanjia || respintuan)
        //当前页面赋值
        this.setData({
            homeBannerList: resBanner.data,
            homeCateList: resCate.data,
            NoticeBar: resNotice.data.title,
            miaoshaGoods: resMiaosha.data.result,
            baokuanGoods: resBaokuan.data.result,
            kanjiaGoods: resKanjia.data.result,
            pintuanGoods: respintuan.data.result
        })
        this.getAllGood()
        this.getUserToken()
    },
    async getAllGood() {
        //根据页数和每页获取所有商品
        const resAllGood = await getAllGood({
            page: this.data.page,
            pageSize: this.data.pageSize
        })
        if (resAllGood.code == 0) {
            //翻转数组
            const allGoodArr = resAllGood.data.result.reverse()
            this.data.allGood = this.data.allGood.concat(allGoodArr)
            this.setData({
                allGood: this.data.allGood
            })
        } else {
            wx.showToast({
                title: '暂无更多商品',
                icon: 'error'
            })
        }
    },
    getUserToken() { //进入页面获取token
        wx.login({
            success: async res => {
                const resToken = await getUserToken(res.code)
                wx.setStorageSync('token', resToken.data.token)
            }
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
        this.onShow()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.data.page++
        this.getAllGood()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})