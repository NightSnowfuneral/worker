import objectAssign from 'object-assign' //封装函数
import Ajax from './index'
import config from '../constants/config'

const Get = function(){
	this.commonDataOpts={url:config.apiUrl.commonData} //新增工单初始值
	this.stationOpts = {url:config.apiUrl.station} //搜索厂站
	this.organizationOpts = {url:config.apiUrl.organization}  //组织机构
	this.taskOpts = {url:config.apiUrl.task}    //当前缺陷
	this.departmentOpts = {url:config.apiUrl.departmentData}  //部门下的人员
	this.journalAllOpts = {url:config.apiUrl.shift_recordsData} //工单查询
	this.scheduleOpts = {url:config.apiUrl.schedule} 
	this.scheduleUserOpts = {url:config.apiUrl.schedulePeo}
	this.schedulesOpts = {url:config.apiUrl.schedules}  //所有用户排班表
	this.possessRolesOpts = {url:config.apiUrl.roles}  //所有角色
	this.privilegesOpts = {url:config.apiUrl.privileges}
	this.userOpts={url:config.apiUrl.user}
	this.titleNameOpts={url:config.apiUrl.titleName}
}

Get.prototype.commonData=function(){  
	const ajax=new Ajax(this.commonDataOpts)

	return ajax.get()
				.then(res=>res)
}

Get.prototype.station = function(value){   //厂站搜索
	
	const opts = this.stationOpts
	const params = {name:value,status:'binded'}
	opts.params = objectAssign(params)
	const ajax = new Ajax(opts)

	return ajax.get()
		.then(res => {
			return res
		})
}

Get.prototype.organization=function(){   //获取部门的组织机构
	const opts = this.organizationOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
	}

Get.prototype.typeinDetail=function(id){  //工单详情
	const opts = {}
	 opts.url = config.apiUrl.typein + '/' + id
	
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res=>res)

}
Get.prototype.task = function(params){   
	
	const opts = this.taskOpts
	opts.params = objectAssign({}, params)

	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}

Get.prototype.department = function(value){   //部门下人员
	const department = {}
	department.url = config.apiUrl.departmentData + '/' + value
	
	const ajax = new Ajax(department)

	return ajax.get()
		.then(res=>res) 

}

Get.prototype.duty = function(value){  //值班人员

	const duty = {}
	duty.url = config.apiUrl.role + '/' + value + '/user'
	
	const ajax = new Ajax(duty)
		return ajax.get()
			.then(res=>res)

}

Get.prototype.journalAll = function(data){   //工单查询
	const opts = {}
	// opts.params={startTime:'',endTime:'',key:'',type:'0'}\
	opts.params = objectAssign({}, data)
	opts.url= config.apiUrl.shift_recordsData
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}

Get.prototype.schedulePlan = function() {   //规则
	const opts = this.scheduleOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}


Get.prototype.scheduleUser = function() {   //规则
	const opts = this.scheduleUserOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}

Get.prototype.schedulesData = function(data){
	
	const duty = {}
	duty.url = config.apiUrl.schedules + '/' + data
	const ajax = new Ajax(duty)
		return ajax.get()
			.then(res=>res)


}

Get.prototype.shift_recordDetail = function(id){  //详情
	const opts = {}
	opts.url = config.apiUrl.shift_recordsDataName + '/' + id
	
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res=>res)
}

Get.prototype.PossessRoles = function(){  //所有角色
	const opts = this.possessRolesOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)

}
Get.prototype.permissions = function(){  //所有权限
	const opts = this.privilegesOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}
Get.prototype.privilegeDetail = function(id){  //角色详情
	const opts = {}
	opts.url = config.apiUrl.role + "/" + id
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)
}
Get.prototype.privilegeUser = function(id){   //角色详情中用户
	const opts={}
	opts.url='role/'+id+'/user'
	const ajax=new Ajax(opts)
	return ajax.get()
				.then(res=>{
					return res
				})
}
Get.prototype.users=function(value){ //所有人员
	const opts=this.userOpts
	const params={name:value}
	opts.params=objectAssign({},params)
	const ajax=new Ajax(opts)
	return ajax.get()
				.then(res=>res)
}
Get.prototype.UserDetail=function(id){  //获取
	const opts={}
	opts.url='user/'+id+'/role'
	const ajax=new Ajax(opts)
	return ajax.get()
				.then(res=>{
					return res
				})
}
Get.prototype.titleName = function(){   //获取权限标题
	const opts = this.titleNameOpts
	const ajax = new Ajax(opts)
	return ajax.get()
		.then(res => res)

}
export default Get 