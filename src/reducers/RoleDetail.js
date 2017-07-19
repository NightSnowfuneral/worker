 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}


const RoleDetail=(state=initialState,action)=>{
	
	switch(action.type) {
		case types.GET_PRIVILEGES_ROLE:
			return objectAssign({},state,{isFetching:true,names:[]})
		case types.GET_PRIVILEGES_ROLENAMW:
			return objectAssign({},state,{isFetching:false,names:action.names})
		default:
			return state
	}
}

export default  RoleDetail 