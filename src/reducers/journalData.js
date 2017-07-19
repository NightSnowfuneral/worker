 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetching:false,
	names:[]
}


const journalData=(state=initialState,action)=>{
	switch(action.type) {
		case types.REQUEST_POST_JOURNAL:
			return objectAssign({},state,{isFetching:true,names:[]})
		case types.RECEIVE_POST_JOURNAL:
			return objectAssign({},state,{isFetching:false,names:action.names})
		
		default:
			return state
	}
}

export default  journalData