


// const timed = []
	


// const DataTime=(state=timed,action)=>{
// 	switch(action.type) {
		
// 		case types.RECEIVE_POST_TIME:
// 			return objectAssign({},state,{time:action.time})
// 		default:
// 			return state
// 	}
// }

// export default  DataTime 

 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'


const initialState = {
	isFetchData:false,
	names:[]
}


const DataTime=(state=initialState,action)=>{
	switch(action.type) {
		
		case types.RECEIVE_POST_TIME:
			return objectAssign({},state,{isFetchData:true,time:action.time})
		default:
			return state
	}
}

export default  DataTime 