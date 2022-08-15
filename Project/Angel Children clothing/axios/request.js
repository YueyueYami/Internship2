const {
    baseUrl
} = require('../axios/dev').pord
const anthUser = 'Yueyue'
module.exports = {

    request(url = '', method = 'GET', data = {}, isVip = true) {
        if (isVip) {
            url = `${baseUrl}/${anthUser}/${url}`
        } else {
            url = `${baseUrl}/${url}`
        }
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '努力加载中'
            })
            wx.request({
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url,
                method,
                data,
                success(res) {
                    wx.hideLoading()
                    resolve(res.data)
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
}