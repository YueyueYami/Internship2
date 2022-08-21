// pages/goodInfo/goodInfo.js
const {
    getGoodInfo,
    addToShopCart,
    getShopCart,
    addUrlencoded,
    deleteShopUrlencoded,
    textShopisShow,
    getGoodSkuPrice
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
        shopCartNum: 0, //购物车商品数量
        isCollect: true,
        skuGoodPrice: 0,
        skuCombination: [], //不同sku组合获取价格
        toMode: 'banner',
        tabsIndex: 0,
        tabsJump: [{
            name: '商品简介',
            to: 'banner',
            toHeight: 0
        }, {
            name: '商品详情',
            to: 'goodinfo',
            toHeight: 0
        }, {
            name: '商品评价',
            to: 'evaluate',
            toHeight: 0
        }],
        tabsheight: 0,
        bannertop: 0,
        bannerheight: 0
    },
    //点击跳转到对应的模块
    tabsJumpMod(e) {
        this.setData({
            toMode: e.currentTarget.dataset.to,
            tabsIndex: e.currentTarget.dataset.index
        })
    },
    totheMode(e) {
        let _this = this
        let query = wx.createSelectorQuery()
        query.select('#banner').boundingClientRect((a) => {
            let conHeight = a.height
            this.data.tabsJump[0].toHeight = a.top
            if (conHeight + this.data.tabsJump[0].toHeight < 55) {
                _this.setData({
                    tabsIndex: 1
                })
            } else if (conHeight + this.data.tabsJump[0].toHeight > 55) {
                _this.setData({
                    tabsIndex: 0
                })
            }
            _this.setData({
                tabsJump: _this.data.tabsJump
            })
        }).exec()
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
    async changeSku(e) {
        const id = e.currentTarget.dataset.id
        const pid = e.currentTarget.dataset.pid
        let newSkuArr = this.data.skuList.find(item => item.id == pid)
        // 循环拿到sku
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
        //根据sku参数获取对应价格
        const skuCombData = {
            pid: pid,
            id: id
        }
        let flag = false
        this.data.skuCombination.forEach((item, index) => {
            if (item.pid == pid) {
                this.data.skuCombination[index].id = id
                flag = true
            }
        })
        if (flag == false) {
            this.data.skuCombination.push(skuCombData)
            console.log(this.data.skuCombination);
        }
        //data赋值
        this.setData({
            skuList: this.data.skuList,
            skuData: this.data.skuData,
            skuCombination: this.data.skuCombination
        })
        if (this.data.skuCombination.length == this.data.skuList.length) {
            const arr = []
            this.data.skuCombination.forEach(item => {
                let str = `${item.pid}:${item.id}`
                arr.push(str)
            })
            const data = {
                goodsId: this.data.id,
                propertyChildIds: arr.join(','),
                token: wx.getStorageSync('token')
            }
            console.log(data);
            const resSkuGoodPrice = await getGoodSkuPrice(data)
            console.log(resSkuGoodPrice);
            if (resSkuGoodPrice.code == 0) {
                this.setData({
                    skuGoodPrice: resSkuGoodPrice.data.price
                })
            } else if (resSkuGoodPrice.code == 404) {
                wx.showToast({
                    title: '当前配置已售罄',
                })
            }
        }

    },
    // 点击添加按钮后添加到购物车
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
            skuList: this.data.skuList,
            skuGoodPrice: 0
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
        this.getShopCartList()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
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
    //获取购物车商品数量
    async getShopCartList() {
        const res = await getShopCart({
            token: wx.getStorageSync('token')
        })
        wx.setStorageSync('shopCartNumber', res.data.number)
        this.setData({
            shopCartNum: res.data.number
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        this.getShopCartList()
        const res = await getGoodInfo(this.data.id)
        //如果有商品sku参数，就赋值给数组，如果没有数组置空
        if (res.data.properties) {
            this.setData({
                skuList: res.data.properties,
            })
        } else {
            this.setData({
                skuList: [],
            })
        }
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
        this.setData({
            id: this.data.id,
            pics: res.data.pics2,
            goodInfo: res.data.basicInfo,

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