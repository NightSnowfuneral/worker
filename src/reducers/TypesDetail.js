 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}

const TypesDetail=(state=initialState,action)=>{
	switch(action.type) {
		case types.REQUEST_GET_STATION :
		    return objectAssign({},state,{isFetching:true,names:[]})
		case types.RECEIVE_GET_VALUE_DETAILS:
			return objectAssign({},state,{isFetching:false,names:action.names})
		default:
			return state
	}
}

export default  TypesDetail 