const config={
	apiUrl:{
		path:'http://192.168.43.254:8084/',
		exist:'search/user_exist',
		appId:'wxappid',
		signature:'wxsignature',
		uar:'search/uar',
		verification:'yzm',
		msg:'user',
		commonData:'search/record',//获取用户新增缺陷前的初始化信息
		typein:'record',  //更新数据
		task:'record',
		search:'search/records', //获取所有工单
		station:'search/resource',
		mansion:'resource',
		organization:'organization',//搜索中的组织机构
		privileges:'privileges',//所有权限
		role:'role', //值班人员
		roles:'roles', //所有角色人员
		menu:'menu',
		user:'search/user',
		tasks:'tasks',
		taskstoday:'tasks/today',
		resources:'resources',
		searchResource:'search/resource',
		patrolHistory:'records/by_station',
		RandomCode:'salt',  //登陆随机码
		adminSession:'session',//登陆
		departmentData:'department', //人员机构
		shift_record:'shift_record',  //日志新增
		shift_recordsData:'shift_records', //日志查询
		schedule:'schedule/plan',  //新增规则
		schedulePeo:'schedule/user', //用户角色分配
		schedules:'schedules',  //所有用户排班表
		scheduleSwitch:'schedule/switch',
		shift_recordsDataName:'shift_record',
		titleName:'menu/home_pc'

		
	},
	reg:{
		phone:/^1[3|4|5|7|8][0-9]{9}$/,
		trim:/\s+/g
	},
}
export default config