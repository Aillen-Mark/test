import {request} from "../utils/request"

//获取首页导航
export function listNav(){
  return request({
    url:"https://tea.qingnian8.com/nav/get",
    method:"POST"
  })
}

//获取新闻数据列表
export function queryNews(data){
	return request({
		url:"https://www.fastmock.site/mock/13998300dc7574018c16109b0ef56a56/xzs/news/get",
		method:"POST",
		data
	})
}


// 获取新闻数据
export function newsDetail(data){
	return request({
		url:"https://www.fastmock.site/mock/13998300dc7574018c16109b0ef56a56/xzs/news/detail",
		method:"POST",
		data
	})
}

//获取产品列表
export function queryProduct(data){
	return request({
		url:"https://tea.qingnian8.com/product/getlist",
		method:"POST",
		data
	})
}


//获取产品详情
export function queryProductDetail(data){
  return request({
    url:"https://tea.qingnian8.com/product/detail",
    method:"POST",
    data
  })
}
