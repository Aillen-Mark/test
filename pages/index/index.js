import {formatNum,formatTime} from "../../utils/common.js"
import {listNav,queryNews} from "../../api/apis.js"
// import {formatData} from "../../utils/common.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navArr:[],
		newsArr:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getNavData(),
		this.getNewsData()
	},

	//获取导航数据
	getNavData(){
		//promise 获取方式简化代码量
		listNav().then(res=>{      
      this.setData({
        navArr:res.data
      })
    })
		// wx.request({
		// 	url: 'https://tea.qingnian8.com/nav/get',
		// 	'method':'POST',
		// 	header:{
		// 		"content-type":"application/json"
		// 	},
		// 	success:res=>{
				// this.setData({
				// 	navArr:res.data.data
				// })
		// 	}
		// })
	},
// 获取新闻数据
	getNewsData(){
		queryNews({
			"limit": 3, //获取多少个
			"hot":true, //是否是推荐的文章
			"size": 0 //分页从多少页开始
		}).then(res=>{
			console.log(res)
			res.data.forEach( item => {
				item.view_count = formatNum(item.view_count)
				item.publish_date = formatTime(item.publish_date,5)
			})
					this.setData({
					newsArr:res.data
				})
		})
		// 嵌套获取
		// wx.request({
		// 	url:"https://www.fastmock.site/mock/13998300dc7574018c16109b0ef56a56/xzs/news/get",
		// 	header:{
		// 		"content-type":"application/json"
		// 	},
		// 	method:"POST",
		// 	data:{
				// "limit": 3, //获取多少个
				// "hot":true, //是否是推荐的文章
				// "size": 0 //分页从多少页开始
		// 	},
			// success:res=>{
			// 	console.log(res.data.data[0].publish_date)
			// 	// 数据格式化处理
			// 	res.data.data.forEach( item => {
			// 		item.view_count = formatNum(item.view_count)
			// 		item.publish_date = formatTime(item.publish_date,5)
			// 	})
			// 			this.setData({
			// 			newsArr:res.data.data
			// 		})
			// 	}
		// 	})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		
	}
})