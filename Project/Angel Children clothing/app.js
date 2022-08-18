// app.js
const {
    getShopCart,
    getUserToken
} = require('./axios/api')
const AUTH = require('./utils/auth')
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // 登录
        wx.login({
            success: res => {}
        })
        //自动登录
        AUTH.checkWXStatus(1)
        AUTH.hasUserLoginChecked()
        AUTH.authRegAndLogin()
        //获取购物车页面脚标
        getShopCart({
            token: wx.getStorageSync('token')
        }).then(res => {
            if (res.code == 0) {
                wx.setTabBarBadge({
                    index: 3,
                    text: res.data.number.toString()
                })
            } else {
                return
            }
        })
    },
    globalData: {
        userInfo: null
    },
})