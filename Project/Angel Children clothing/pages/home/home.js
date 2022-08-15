//引入首页需要的接口
const {
    getHomeBanner, //首页banner图
    getHomeCate, //首页的分类模块
    getNoticeBar, //首页资讯的接口
    getMiaoshaGoods, //获取秒杀商品
    getBaokuanGoods, //获取爆款商品
    getKanjiaGoods, //获取砍价商品
    getPintuanGoods, //获取拼团商品
    getAllGood, //获取所有商品
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
        allGood: [] //所有商品
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

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        const resBanner = await getHomeBanner() //获取首页banner图
        const resCate = await getHomeCate() //获取首页分类图
        const resNotice = await getNoticeBar() //获取资讯栏提示
        //获取秒杀类商品
        const miaoshaData = true //秒杀类商品传值
        const resMiaosha = await getMiaoshaGoods(miaoshaData) //获取秒杀类商品数据
        //获取爆款类商品
        const baokuanData = 1 //爆款类商品传值
        const resBaokuan = await getBaokuanGoods(baokuanData) //获取爆款类商品数据
        //获取砍价商品
        const kanjiaData = true //砍价类商品传值
        const resKanjia = await getKanjiaGoods(kanjiaData) //获取砍价类商品
        //获取拼团商品
        const pintuanData = true //拼团商品传值
        const respintuan = await getPintuanGoods(pintuanData) //获取拼团商品
        //获取所有商品
        const resAllGood = await getAllGood()
        //翻转数组
        const allGoodArr = resAllGood.data.result.reverse()
        //当前页面赋值
        this.setData({
            homeBannerList: resBanner.data,
            homeCateList: resCate.data,
            NoticeBar: resNotice.data.title,
            miaoshaGoods: resMiaosha.data.result,
            baokuanGoods: resBaokuan.data.result,
            kanjiaGoods: resKanjia.data.result,
            pintuanGoods: respintuan.data.result,
            allGood: allGoodArr
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