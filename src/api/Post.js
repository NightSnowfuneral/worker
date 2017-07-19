import objectAssign from 'object-assign'
import Ajax from './index'
import config from '../constants/config'


const Post = function(){
	this.RandomCodeOpts = {url:config.apiUrl.RandomCode} //获取随机码
	this.adminSessionOpts = {url:config.apiUrl.adminSession} //登陆信息提交
	this.ObtainOpts = {url:config.apiUrl.search} //获取工单
	this.postTypeinOpts = {url:config.apiUrl.typein} //新建缺陷工单
	this.postSearchOpts = {url:config.apiUrl.search} //搜索缺陷工单功能
	this.typein = {url:config.apiUrl.typein}   //更新工单信息
	this.shift_recordOpts = {url:config.apiUrl.shift_record} //新增日志
	this.scheduleOpts = {url:config.apiUrl.schedule} //规则
	this.scheduleUserOpts = {url:config.apiUrl.schedulePeo}
	this.scheduleSwitchOpts = {url:config.apiUrl.scheduleSwitch}  //值班工单上传
	this.roleSwitcgOpts = {url:config.apiUrl.role}

}

Post.prototype.RandomCode = function(data){		//获取随机码函数
	const opts = this.RandomCodeOpts
	opts.data = objectAssign({},data)
	
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res => res )
}

Post.prototype.adminSession = function(data){ //登陆信息提交
	const opts = this.adminSessionOpts
	opts.data = objectAssign({}, data)
	
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res => res)
}
Post.prototype.Obtain = function(data){ //所有的工单 但是用的是搜索接口
	const opts = this.ObtainOpts
	opts.data = objectAssign({}, data)
	
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res => res)
}

Post.prototype.postTypein = function(data){  //新建缺陷工单提交
	const opts = this.postTypeinOpts
	opts.data = objectAssign({}, data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res => res)
}

Post.prototype.postSearch = function(data){  //搜索功能
	const opts = this.postSearchOpts
	opts.data = objectAssign({}, data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res => res)
}
Post.prototype.dispose=function(data){   //更新数据
	const opts=this.typein
	opts.data=objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.put()
		.then(res=>res)
}



Post.prototype.shift_record = function(data){  //新建日志
	const opts = this.shift_recordOpts
	opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res=>res)
}



Post.prototype.schedulePlan = function(data){  //新建规则
	const opts = this.scheduleOpts
	opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res=>res) 
}

Post.prototype.schedule_user = function(data){ //新建用户排班计划
   const opts = this.scheduleUserOpts
   opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res=>res) 
}

Post.prototype.scheduleSwitch = function(data){  //换班上传
	const opts = this.scheduleSwitchOpts
	
	opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res=>res)
}


Post.prototype.shift_recordData = function(data,id){ 
	const opts={}
	opts.url = config.apiUrl.shift_record + '/' + id
	opts.data= objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.put(opts)
		.then(res=>res)
}


Post.prototype.roleSwitcg = function(data){  //新建角色
	const opts = this.roleSwitcgOpts
	opts.data =  objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.post()
		.then(res=>res)
}
Post.prototype.putRole = function(data,id){  //更新权限
	const opts={}
	opts.url=config.apiUrl.role+'/'+id
	opts.data=objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.put()
		.then(res=>res)
}
Post.prototype.putRoleUser = function(data,id){  //更新角色
	const opts = {}
	opts.url = 'role/' + id + '/user'
	opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.put()
		.then(res=>res)
}
Post.prototype.putUserDetail = function(data,id){ //更新用的角色
	const opts = {}
	opts.url = 'user/' + id + '/role'
	opts.data = objectAssign({},data)
	const ajax = new Ajax(opts)
	return ajax.put()
		.then(res=>res)
}
Post.prototype.Delectshoift = function(id){  //删除日志
	const opts = {}
	 opts.url = config.apiUrl.shift_record + '/' + id
	 
	const ajax = new Ajax(opts)
	return ajax.delete()
		.then(res=>res)
}
Post.prototype.DelectOrder = function(id){ //删除工单
	const opts = []
	opts.url = config.apiUrl.typein + '/' + id
		const ajax = new Ajax(opts)
	return ajax.delete()
		.then(res=>res)
}


Post.prototype.DelectRule = function(id){ //删除日志
	const opts = []
	opts.url = config.apiUrl.schedulePeo + '/' + id
	const ajax = new Ajax(opts)
	return ajax.delete()
		.then(res=>res)
}

Post.prototype.DelectRuleData = function(id){  //删除规则
	const opts = []

	opts.url = config.apiUrl.schedule + '/' + id
	const ajax = new Ajax(opts)
	return ajax.delete()
		.then(res => res)
}

Post.prototype.DelectRoleData = function(id){  //删除角色
	const opts = []
	opts.url = config.apiUrl.role + '/' + id
	const ajax = new Ajax(opts)
	return ajax.delete()
		.then(res => res)

}


export default Post