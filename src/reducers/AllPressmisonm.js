import * as types from '../constants/ActionTypes'

const AllPressmisonm = (state=[], action) =>{
	switch(action.type) {
		case types.GEUTALLUSERPERMISSIONS:
				return action.data
			break;
		default :
			return state	
	}
}


export default AllPressmisonm