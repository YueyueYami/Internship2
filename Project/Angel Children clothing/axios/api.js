const {
    request
} = require('./request')
module.exports = {
    //获取开屏banner图
    getAppBanner(type = 'app') {
        return request('banner/list', 'GET', {
            type
        })
    },
    //获取首页banner图
    getHomeBanner(type = 'index') {
        return request('banner/list', 'GET', {
            type
        })
    },
    //获取分类
    getHomeCate() {
        return request('/shop/goods/category/all', 'GET')
    },
    //获取资讯提示
    getNoticeBar() {
        return request('/notice/last-one', 'GET')
    },
    //获取秒杀商品
    getMiaoshaGoods(data) {
        return request('shop/goods/list/v2', 'POST', {
            miaosha: data
        })
    },
    //获取爆款商品
    getBaokuanGoods(data) {
        return request('shop/goods/list/v2', 'POST', {
            recommendStatus: data
        })
    },
    //获取疯狂砍价商品
    getKanjiaGoods(data) {
        return request('shop/goods/list/v2', 'POST', {
            kanjia: data
        })
    },
    //获取拼团商品
    getPintuanGoods(data) {
        return request('shop/goods/list/v2', 'POST', {
            pingtuan: data
        })
    },
    //获取所有商品
    getAllGood() {
        return request('shop/goods/list/v2', 'POST')
    },
    //模糊搜索商品，搜索的商品排序
    getSearchGoods(data) {
        return request('shop/goods/list/v2', 'POST', {
            nameLike: data.value, //模糊搜索
            orderBy: data.orderByMode //排序模式
        })
    },
    //商品详情的接口
    getGoodInfo(data) {
        return request('shop/goods/detail', 'GET', {
            id: data
        })
    }
}