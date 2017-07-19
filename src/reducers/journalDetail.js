 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	Data:[]
}

const TypesDetail=(state=initialState,action)=>{
	switch(action.type) {
		
		case types.RECEIVE_GET_VALUE_JOUTDTAUI:
			return objectAssign({},state,{isFetching:false,Data:action.names})
		default:
			return state
	}
}

export default  TypesDetail 