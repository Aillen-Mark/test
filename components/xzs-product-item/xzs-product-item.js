// components/xzs-product-item/xzs-product-item.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		item:{
			type:Object,
			value:{
				grid:"dengji1",
				picpath:"",
				price:"",
				pronum:"",
				title:"",
				weight:"",
				year:"",
				_id:""
			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		item:{}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		clickPro(e){
			console.log(e);
			let id = e.currentTarget.dataset.id;
			wx.navigateTo({
				url: '/pages/productDetails/productDetails?id='+id
			})
		}
	}
})
