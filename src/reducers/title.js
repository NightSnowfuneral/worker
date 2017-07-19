import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const settingState =(state={},action)=>{
	
	switch(action.type){
		case types.COM_CONF:
			return Object.assign({},state,{   //Objecyt.assign将会返回一个新的state对象
				...action.settings
			});
		
		case types.CHAMGE_TITLE:
			return Object.assign({},state,{
				title:action.title
			})
		default:
			return state
	}
}

export default settingState