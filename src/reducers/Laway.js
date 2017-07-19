import * as types from '../constants/ActionTypes'
import objectAssign from 'object-assign'
const privileges = (state=[],action) => {
	switch(action.type) {
		case types.GET_PRIVILEGES :
			return action.list
		default :
			return state
	}
}
export default privileges