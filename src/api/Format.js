    //正则表达式
export const switchFormat= (obj) =>{ //获取表单的数据进行处理
	const array = []
	for (var key in obj) {
		if (obj[key] && key.split('-')[1]) {   //切割字符串获取到v表达的value的值进行处理如果结果是true
			array.push(parseInt(key.split('-')[1]))   //获取到privilege-12后面的数字 切割字符串
		} //字符串转数字
	}  //输出的结果则是我们想要的
	return array  
}


export const isSwitchFormat=(arry,lists)=>{    //详情中使用 已分配的权限 获取所有权限，后台传给我id进行对比输出
	let newArry = []

	if (arry.length > 0 && lists) {    //所有权限 循环几次
		for(var item of arry){  //把所有的权限分离出来
			for (var i of lists) {  // 把这个角色有的权限分离进行对比
				if (item.id ===i) {
					newArry.push(item) //输出有的权限
				}
			}
		}
	}

	return newArry
}


export const noSwitchFormat=(arry,lists)=>{  //未分配的权限
	let newArry=[]
	if(arry.length>0 && lists){  
		if(lists.length==0){  //未分配的权限未0 则直接输出
			newArry=arry
		}else{
			for(var item of arry){
				for(var i of lists){
					if(item.id===i){  //根据判断已分配的跟所有进行对比，把已分配的剔除，把未分配的输出
						break;
					}else if(i===lists[lists.length-1]){//一个从0开始一个从1开始 则需要减1
						newArry.push(item)   //把长度小于1 的输出
					}
				}
			}
		}
		
	}
	return newArry
}


export const isSwitcxhName =(array) =>{
	
	array.map((item,i)=>{
		item.type = "remember"
		item.rowCn = 'row-11'
		item.value = false
	})

	return  array

}



export const Allbutton = (array) =>{   //给查询的下拉框添加全部字段
	const allBut = {label:"全部",value:""}
	array.push(allBut)
	
	return array
}

export const CheckCharacter = (array) =>{   //检验特殊字符
	var pattern = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\(\)\（\）\!\！\,\.\?\[\]\{\}\ \。\-\_\+\=\“\”\"\"\'\'\‘\'\n\r\s\，\;\；\·\、\?\？\>\》\<\《\,\.]/g  
	let res = pattern.test(array)
	return res
}


export const DynamicTitle = (array)=>{
	return array 
}



export const DynamicTitleName = (array,title)=>{  //编辑详情删除按钮
	var editor = "编辑"
	var deleteD = "删除"
	var details = "详情"
	let newList = []
	
	if (array.name && title) {
		newList = array.name.filter((list)=>list.name !== title)

	}
	else if(array.name) {
		newList = array.name
	}
	
	newList.map((item,i)=>{
		Distribution(item)
	})
	return newList
}

function Distribution(item){ //其他那妞处理
	switch(item.name) {
		case "编辑":
			item.funIndex = "0"
			break;
		case "详情":
			item.funIndex = "8"
			break;
		case "删除":
			item.funIndex = "9"
	}
}


export const addBtn = (state,title) =>{  //新增按钮
		
		if (state.name) {
			for (var i = 0; i < state.name.length; i++) {
			if (state.name[i].name == title ) {
				return title
			}
			}	
		}
		
	

		return false
	}