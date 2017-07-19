
 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}


const DataRoleShiofe=(state=initialState,action)=>{
	switch(action.type) {
		case types.REQUEST_GET_SY_ROLES:
			return objectAssign({},state,{isFetching:true,names:[]})
		case types.RETIVE_GET_SY_ROLES:
			return objectAssign({},state,{isFetching:false,names:action.names})
		default:
			return state
	}
}

export default  DataRoleShiofe