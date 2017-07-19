
 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}


const DataNameShiofe=(state=initialState,action)=>{
	switch(action.type) {
		case types.REQUEST_GET_SG_HIFT:
			return objectAssign({},state,{isFetching:true,names:[]})
		case types.RETIVE_GET_SG_HIFT:
			return objectAssign({},state,{isFetching:false,names:action.names})
		default:
			return state
	}
}

export default  DataNameShiofe 