import * as types from '../constants/ActionTypes'

const phone = (state={}, action) =>{
	switch(action.type) {
		case types.GET_COMMON_DATA:
				return action.data
			break;
		default :
			return state	
	}
}


export default phone