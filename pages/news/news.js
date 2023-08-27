import {queryNews} from "../../api/apis"
import {formatNum,formatTime} from "../../utils/common.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newsArr:[],
		load:false,
		isData:false //用于判断列表长度是否与网络获取长度相等
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getNewsData()
	},
	// 获取新闻列表
	getNewsData(size=0){
		this.setData({
			load:true
		})
		queryNews({
			"limit": 8, //获取多少个
			"hot":true, //是否是推荐的文章
			size //分页从多少页开始(数字表示跳过多少条数据)
		}).then(res=>{
			wx.stopPullDownRefresh()
			console.log(res)
			res.data.forEach(item => {
				item.view_count = formatNum(item.view_count)
				item.publish_date = formatTime(item.publish_date,5)
			})
			let oldarr = this.data.newsArr
			let newarr = oldarr.concat(res.data)
			// 下面的方法也可以
			// let newarr = [...oldarr,...res.data]
			if(newarr.length == res.total){
				this.setData({
					isData:true
				})
			}
			this.setData({
				load:false,
				newsArr: newarr
			})
		})

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
		this.setData({
			newsArr:[],
			load:false,
			isData:false
		})
		this.getNewsData();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		if(this.data.isData)	return;
		this.getNewsData(this.data.newsArr.length);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})