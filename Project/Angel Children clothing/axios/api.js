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
    //获取不同活动区块的商品
    getGoodsClass(data) {
        return request('shop/goods/list/v2', 'POST', data)
    },
    //获取所有商品
    getAllGood(data) {
        return request('shop/goods/list/v2', 'POST', data)
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
    },
    //根据微信login返回的code获取token
    getUserToken(data) {
        return request('user/wxapp/authorize', 'POST', {
            code: data
        })
    },
    //点击商品右下角的按钮将商品添加到购物车
    addToShopCart(data) {
        return request('shopping-cart/add', 'POST', data)
    },
    //获取购物车列表
    getShopCart(data) {
        return request('shopping-cart/info', 'GET', data)
    },
    //修改购物车选中状态
    shopCartGoodSelect(data) {
        return request('shopping-cart/select', 'POST', data)
    },
    //购物车商品数量改变
    shopCartGoodNum(data) {
        return request('shopping-cart/modifyNumber', 'POST', data)
    },
    //移除一条购物车的商品
    removeShopCartGood(data) {
        return request('shopping-cart/remove', 'POST', data)
    },
    // 添加商品收藏
    addUrlencoded(data) {
        return request('shop/goods/fav/add', 'POST', data)
    },
    // 删除商品收藏
    deleteShopUrlencoded(data) {
        return request('shop/goods/fav/delete', 'POST', data)
    },
    //检测是否已收藏
    textShopisShow(data) {
        return request('shop/goods/fav/check', 'GET', data)
    },
}