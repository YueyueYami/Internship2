// pages/my/my.js
const API = require('../../axios/api')
const AUTH = require('../../utils/auth')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginFlag: 0,
        userInfo: {}
    },
    //login
    login() {
        const _this = this
        wx.getUserProfile({
            lang: 'zh_CN',
            desc: '实现微信登录',
            success(res) {
                wx.showToast({
                    title: '用户授权成功',
                })
                wx.setStorageSync('login', 1)
                _this.setData({
                    loginFlag: 1
                })
                wx.setStorageSync('userInfo', res.userInfo)
                console.log(res.userInfo);
                _this.setData({
                    userInfo: res.userInfo
                })
            },
            fail() {
                wx.showToast({
                    title: '用户取消授权',
                    icon: 'error'
                })
            }
        })
    },
    //用户资金
    toUserCapital() {
        wx.navigateTo({
            url: '../my/capital/capital',
        })
    },
    //成长值
    toUserGrowUp() {
        wx.navigateTo({
            url: '../my/growth/growth',
        })
    },
    //到订单列表
    toUserOrderList(e) {
        console.log(e.currentTarget.dataset.index);
        if (e.currentTarget.dataset.index) {
            wx.navigateTo({
                url: `../my/order/order?index=${e.currentTarget.dataset.index}`
            })
        } else {
            wx.navigateTo({
                url: '../my/order/order'
            })
        }
    },
    //CPS订单列表
    toUserCPSOrder() {
        wx.navigateTo({
            url: '../my/CPSorder/CPSorder',
        })
    },
    //回收订单列表
    toUserRecOrder() {
        wx.navigateTo({
            url: '../my/recall/recall',
        })
    },
    //优惠买单
    toPay() {
        wx.navigateTo({
          url: '../my/paying/paying',
        })
    },
    //申请发票
    toAppBill() {
        wx.navigateTo({
            url: '../my/appInvoice/Invoice',
        })
    },
    // 发票记录
    toBill() {
        wx.navigateTo({
            url: '../my/billing/billing',
        })
    },
    //签到
    toRegister() {
        wx.navigateTo({
            url: '../my/register/register',
        })
    },
    //成为分销商
    toDistributor() {
        wx.navigateTo({
            url: '../my/distributor/distribute',
        })
    },
    //积分券兑换积分
    toExChange() {
        wx.navigateTo({
            url: '../my/exChange/exchange',
        })
    },
    //到帮助中心
    toHelpCenter() {
        wx.navigateTo({
            url: '../my/helpCenter/help',
        })
    },
    //到我的信息
    toUserInfo() {
        wx.navigateTo({
            url: '../my/userinfo/userinfo',
        })
    },
    //到设置
    toSystemSet() {
        wx.navigateTo({
            url: '../my/SystemSet/setup',
        })
    },
    //到优惠券的TabBar
    toDiscount() {
        wx.switchTab({
            url: '../discount/discount',
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
        const login = wx.getStorageSync('login')
        console.log(login);
        if (login) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
        } else {
            loginFlag: 0
        }
        this.setData({
            loginFlag: login
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