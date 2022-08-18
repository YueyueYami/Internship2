// pages/goodInfo/goodInfo.js
const {
    getGoodInfo,
    addToShopCart,
    getShopCart,
    addUrlencoded,
    deleteShopUrlencoded,
    textShopisShow
} = require('../../axios/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 1216006, //默认展示id
        goodInfo: {}, //基本数据
        content: '', //富文本内容
        skuList: [], //商品规格列表
        buyShow: false, //购买时弹出层
        buyNum: 1,
        skuData: [],
        shopCartNum: 0, //购物车数量
        isCollect: true
    },
    buyShowTago() {
        this.setData({
            buyShow: true
        })
    },
    //关闭商品参数弹窗
    onClose() {
        this.setData({
            buyShow: false
        })
    },
    //选择商品数量
    onChange(e) {
        this.setData({
            buyNum: e.detail
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
    //选择sku标签
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
    // 点击添加按钮后跳转到购物车
    async addShopCart() {
        const res = await addToShopCart({
            sku: JSON.stringify(this.data.skuData),
            token: wx.getStorageSync('token'),
            goodsId: this.data.goodInfo.id,
            number: this.data.buyNum
        })
        this.data.skuList.forEach(item => {
            console.log(item.childsCurGoods);
            item.childsCurGoods.forEach(item => {
                item.active = false
            })
        })
        this.setData({
            buyShow: false,
            buyNum: 1,
            skuData: [],
            skuList: this.data.skuList
        })
        const resShopCart = await getShopCart({
            token: wx.getStorageSync('token')
        })
        console.log(resShopCart.data.number);
        this.setData({
            shopCartNum: resShopCart.data.number
        })
        if (res.code == 30000) {
            wx.showToast({
                title: res.msg.toString(),
                icon: 'none'
            })
        } else if (res.code != 0) {
            return false
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    //收藏
    async collect() {
        if (this.data.isCollect == true) {
            let data = {
                token: wx.getStorageSync('token'),
                type: 1,
                goodsId: this.data.id
            }
            let collRes = await addUrlencoded(data)
            console.log(collRes);
            if (collRes.code == 0) {
                this.setData({
                    isCollect: false,
                })
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                })
            } else {
                this.setData({
                    isCollect: true,
                })
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                })
            }
        } else if (!this.data.isCollect) {
            let data = {
                token: wx.getStorageSync('token'),
                type: 1,
                goodsId: this.data.id
            }
            let collRes = await deleteShopUrlencoded(data)
            console.log(collRes);
            if (collRes.code == 0) {
                this.setData({
                    isCollect: true,
                })
                wx.showToast({
                    title: '取消收藏成功',
                    icon: 'success',
                })
            } else {
                this.setData({
                    isCollect: false,
                })
                wx.showToast({
                    title: '取消收藏失败',
                    icon: 'success',
                })
            }
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        const res = await getGoodInfo(this.data.id)
        const resShopCart = await getShopCart({
            token: wx.getStorageSync('token')
        })
        console.log(resShopCart.data);
        const num = resShopCart.data.number
        //检测是否已收藏
        const resShoucang = await textShopisShow({
            goodsId: this.data.id,
            type: 1,
            token: wx.getStorageSync('token')
        })
        if (resShoucang.data == '已收藏') {
            this.setData({
                isCollect: false
            })
        } else {
            this.setData({
                isCollect: true
            })
        }
        console.log(resShoucang);
        this.setData({
            id: this.data.id,
            pics: res.data.pics2,
            shopCartNum: num,
            goodInfo: res.data.basicInfo,
            skuList: res.data.properties,
            content: res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'),
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