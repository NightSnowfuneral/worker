import * as types from '../constants/ActionTypes'


const department = (state=[], action) =>{
	switch(action.type) {
		case types.CHANGE_DEPARTMENT:
				return action.names
			break;
		default :
			return state	
	}
}


export default department