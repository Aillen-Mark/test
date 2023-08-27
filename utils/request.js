// const baseURL = 'https://tea.qingnian8.com';

export function request(params){
	let dataobj =  params.data || {};
	let headerobj = {
		'content-type' : 'application/json'
	}
	return new Promise((resolve,reject)=>{
		wx.request({
			// url: baseURL + params.url,
			url: params.url,
			method: params.method || "GET",
			data:dataobj,
			header:headerobj,
			success:res=>{
				if(res.data.errCode!=0){
					reject(res.data);
					wx.showToast({
						title: res.data.errMsg,
						mask:true,
						icon:"error"
					})
					return;
				}
				resolve(res.data)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}