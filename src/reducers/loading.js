import * as types from '../constants/ActionTypes'
import objectAssign from 'object-assign'

const loading = (state=false,action) => {
	switch(action.type) {
		case types.CHANGE_LOADING :
			return action.loading
		default :
			return state
	}
}
export default loading