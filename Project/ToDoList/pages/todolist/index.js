// pages/todolist/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '',
        list: [],
        donum: 0,
        oknum: 0
    },
    input(e) {
        this.data.inputValue = e.detail.value
        this.setData({
            inputValue: this.data.inputValue
        })
    },
    addToDo() {
        let obj = {
            checked: false,
            val: this.data.inputValue,
        }
        this.data.list.push(obj)
        this.setData({
            list: this.data.list,
            inputValue: ''
        })
        this.render()
    },
    //修改状态
    editCheck(e) {
        let index = e.target.dataset.index
        console.log();
        this.data.list[index].checked = !this.data.list[index].checked
        this.setData({
            list: this.data.list
        })
        this.render()
    },
    //删除todo
    delToDo(e) {
        let index = e.target.dataset.index
        this.data.list.splice(index, 1)
        this.setData({
            list: this.data.list
        })
        this.render()
    },
    render() {
        this.data.donum = this.data.list.filter(item => item.checked == false).length
        this.data.oknum = this.data.list.filter(item => item.checked == true).length
        console.log(this.data.donum);
        this.setData({
            donum: this.data.donum,
            oknum: this.data.oknum
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