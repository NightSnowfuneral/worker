 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}


const Getstaiton=(state=initialState,action)=>{
	switch(action.type) {
		case types.REQUEST_GET_VALUE_STATION:
			return objectAssign({},state,{isFetching:true,names:[]})
		case types.RECEIVE_GET_VALUE_STATION:
			return objectAssign({},state,{isFetching:false,names:action.names})
		default:
			return state
	}
}

export default  Getstaiton 