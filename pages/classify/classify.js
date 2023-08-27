// pages/classify/classify.js

import {listNav,queryProduct} from "../../api/apis"


let navid;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navActive:0,
		navArr:[],
		proArr:[],
		loading:false,
		isData:false //用与判断列表长度是否与网络获取信息长度相等 
		//判断proArr长度是否为0以便于下框的判断
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		let {idx} = options;
		console.log(idx);
		await	this.getNavList();
		if(idx){
			this.navChange(idx);
		}
		else{
			navid = this.data.navArr[0]._id;
			this.getProductList();
		}
	},
	// 导航栏点击切换事件
	navChange(e){
		let index = e?.detail?.index ?? e;
		console.log(typeof index);
		navid = this.data.navArr[index]._id
		this.setData({
			proArr:[],
			loading:false,
			isData:false,//用与判断列表长度是否与网络获取信息长度相等 
			navActive:Number(index)  //注意这个地方传值时应该将其数据类型转化为Number否则无法改变数据类型
		})
		this.getProductList()
	},
	// 获取分类导航
	async getNavList(){
		await	listNav().then(res=>{
			this.setData({
				navArr:res.data
			})
			this.selectComponent("#myTabs").resize() //注意#表示解引用否则报参数错误
		})
	},
	// 获取产品列表
	getProductList(size=0 , limit=3){
		this.setData({
			loading:true
		})
		queryProduct({
			navid, //分类ID
			limit,
			size
		}).then(res=>{
			console.log(res);
			let oldarr = this.data.proArr
			// 数组拼接
			let newarr = oldarr.concat(res.data)
			// 下面的方法也可以
			// let newarr = [...oldarr,...res.data]
			if(newarr.length == res.total){
				this.setData({
					isData:true
				})
			}
			wx.stopPullDownRefresh()
			this.setData({
				proArr:newarr,
				loading:false
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
			newarr:[],
			isData:false 
		})
		this.getProductList()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		if(this.data.isData)	return;
		this.getProductList(this.data.proArr.length,2);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})