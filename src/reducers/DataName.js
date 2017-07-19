 import objectAssign from 'object-assign'
import * as types from '../constants/ActionTypes'

const initialState = {
	isFetching:false,
	names:[],
	logs:[]
}



function tdData(state,index){

	let data = []

	state.map((item,i)=>{
			let dapt = {}
			dapt.title = item
			dapt.id = parseFloat(index + '.01' + + i + (i>10 ? i : 1))
			dapt.value = i+1
			dapt.component = false
			data.push(dapt)
		})

	return 	data
				
				
				

		   

}

function tdDept(state,action){
		state.map((item,i)=>{
			if (item.id !== action.id  ) {
				return 
			}
			item.component = !item.component

		})
		return state 
	}
const todo = (state, action, index) => {
  switch (action.type) {
    case types.ADD_TODO:
      return  tdData(state,index)
      break;
    case types.TOGGLE_TODO:
      return tdDept(state,action)
     break;
    default:
      return state
  }
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
	    action.names.map((t,index) =>(
	      			t.schedule = todo(t.schedule,action,index)
	      		))
      			
	return objectAssign({},state,{isFechting:true,names:action.names,logs:action.logs})   
        
      
    case types.TOGGLE_TODO:
      
      state.names.map((item,i)=>(
      		item.schedule = todo(item.schedule,action)
      	))

      return objectAssign({},state,{isFechting:true,names:state.names,logs:state.logs})
      
    default:
      return state
  }
}

export default todos