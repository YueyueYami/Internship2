const API = require('../axios/api')
//检测登录状态
function checkWXStatus() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: () => {
                resolve(true)
            },
            fail: () => {
                resolve(false)
            }
        })
    })
}
//检测用户是否登录或者token是否有效
async function hasUserLoginChecked() {
    //先查看本地有没有token
    const token = wx.getStorageSync('token')
    if (!token) return false;
    //再查看本地token是否有效
    const res = await API.getUserToken(token)
    //0代表成功 非0代表token无效
    if (res.code !== 0) {
        //如果toke无效，删除本地token
        wx.removeStorageSync('token')
        return false
    }
}
//自动登录注册
function authRegAndLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: async res => {
                //调用自动注册登录接口
                const result = await API.getUserToken(res.code)
                //保存token
                wx.setStorageSync('token', result.data.token)
                //保存用户id
                wx.setStorageSync('uid', result.data.uid)
            }
        })
    })
}
module.exports = {
    checkWXStatus,
    hasUserLoginChecked,
    authRegAndLogin
}