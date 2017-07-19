import * as types from '../constants/ActionTypes'
import Ajax from '../api/index.js'
import Post from '../api/Post'
import Get from '../api/Get'
const get = new Get()
const post = new Post()





export const title = (title) => ({  //系统名称
  type:types.CHAMGE_TITLE,
  title
})







export const receiveGetStationNames = (json) =>({ //已完成数据
  type:types.RECEIVE_GET_STATION,
  names:json.list
})

export const requestGetStationNames = () => ({ //未完成数据
  type:types.REQUEST_GET_STATION,

})



export const fetchPosts = (data) => async dispatch => { //所有数据获取ajax
      dispatch(requestGetStationNames())
      const json = await get.task(data)
     

      
      dispatch(receiveGetStationNames(json))     
}




export const fetchPostsIfNeeded = (data) => (dispatch, getState) => {  //启动与判断
   
    return dispatch(fetchPosts(data))
  
}


export const setCommonData = (data) => ({  //系统名称
  type:types.GET_COMMON_DATA,
  data
})

export const requestGetStationDataNames = () => ({  //获取场站b不成功
  type:types.REQUEST_GET_VALUE_STATION
}) 

export const receiveGetStationDataNames = (json) => ({ //获取场站成功
  type:types.RECEIVE_GET_VALUE_STATION,
  names: json.list
}) 

export const getStationNames = (value) => async (dispatch) => {  //厂站搜索
   dispatch(requestGetStationDataNames)

   const json = await get.station(value)
    console.log(json)
   dispatch(receiveGetStationDataNames(json))
}

export const postStationSelect = (data) => async (dispatch) =>{    //工单条件搜索
    dispatch(requestPostStationSelect())
    const json = await post.postSearch(data)
    dispatch(receivePostStationSelect(json))

}

export const receivePostStationSelect = (json) => ({ //工单条件成功
    type:types.RECEIVE_POST_VALUE_SEARCH,
    names:json.list
})

export const requestPostStationSelect = () => ({  //工单不成功
  type:types.REQUEST_POST_VALUE_SEARCH
})



export const requesGetDetail = (id) => async(dispatch) => {  //获取数据
    dispatch(GetrequestGetDetail())
    const json = await get.typeinDetail(id)
    dispatch(receiveGetDetail(json))
}

export const GetrequestGetDetail = () => ({
   type:types.REQUEST_GET_VALUE_DETAILS
})

export const receiveGetDetail = (json) =>({ //获取工单详情信息
  type:types.RECEIVE_GET_VALUE_DETAILS,
  names:json.rocord
})


export const GetsetCurrent = (status) => async(dispatch) =>{   //当前
   
   
  const json = await get.task(status)
  
  dispatch(setCurrent(json))
}

// export setCurrent = (json) => ({
//   type:types.GET_CURRENT_LIST,
//   names:
// })



export const changeLoading = (loading) => ({
  type: types.CHANGE_LOADING,
  loading
})



export const department = (value) => async(dispatch) => {  //部门下属
  const json = await get.department(value)
 
  dispatch(departmentPeople(json))

}

export  const departmentPeople  = (json) => ({   //部门下属
  type:types.CHANGE_DEPARTMENT,
  names:json.users
}) 


export const journalData = (data) => async(dispatch) =>{   //查询
  dispatch(journalRetivr())
 
  const json = await get.journalAll(data)
 
 
  dispatch(journalreceive(json))
}
export const journalSelect = (data) => async(dispatch)=>{//日志查询
    dispatch(journalRetivr())
    const json = await get.journalAll(data)
    dispatch(journalSelectData(json))
}


export const journalSelectData = (json) =>({
  type:types.RECEIVE_POST_JOURNALSELECT,
  names:json.records
})

export const journalSelectRetivr = () => ({
  type:REQUEST_POST_JOURNALSELECT
})


export const journalRetivr = () =>({ //未完成
  type:types.REQUEST_POST_JOURNAL
})

export const journalreceive = (json) =>({  //已完成 
  type:types.RECEIVE_POST_JOURNAL,
  names:json.records
})



//规则action
export const RuleData = () => async(dispatch) =>{   //查询
  dispatch(RuleRetivr())
  
  const json = await get.schedulePlan()

 
  dispatch(Rulereceive(json))
}

export const RuleRetivr = () =>({ //未完成
  type:types.REQUEST_POST_RULE
})

export const Rulereceive = (json) =>({  //已完成 
  type:types.RECEIVE_POST_RULE,
  names:json.plans
})



export const RulePeole = () => async(dispatch) =>{  //人员数据获取
  dispatch(RulePeoleRetive())
  const json = await get.scheduleUser()
 
  dispatch(RulePeoleReceive(json))
}

export const RulePeoleRetive = () => ({  //未完成
  type:types.REQUEST_POST_PEOEPL
})
 
export const RulePeoleReceive = (json) => ({  //已完成
  type:types.RECEIVE_POST_PEOEPL,
  names:json.records
})


export const DataName = (data) => async(dispatch) =>{
    dispatch(DutyPeoleRetive())
    const json = await get.schedulesData(data)
    
    dispatch(addTodo(json))
}

export const DutyPeoleRetive = () => ({  //未完成
  type:types.REQUEST_POST_ADD
})


export const addTodo = (json) => ({
  type: types.ADD_TODO,
  names:json.schedules,
  logs:json.logs

})


export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  id
})


export const JourDetail = (id) => async(dispatch) =>{
  const json = await get.shift_recordDetail(id)
 
  dispatch(JourTodo(json))
}

export const JourTodo = (json) => ({
  type:types.RECEIVE_GET_VALUE_JOUTDTAUI,
  name:json
})



export const DataDetail = () =>async(dispatch) =>{
     dispatch(DataDetailReace())
     const json = await get.journalAll("")
    
     dispatch(DataDetailReTIVE(json))
}
export const DataDetailReace = () => ({  //未完成
  type:types.REQUEST_GET_SG_HIFT
})

export const DataDetailReTIVE = (json) =>({
  type:types.RETIVE_GET_SG_HIFT,
  names:json.records
})




export const Dataroles = () => async(dispatch) => {  //获取角色所有数据
  dispatch(DatarolesRever())
  const json = await get.PossessRoles()
 
  dispatch(DatarolesReverRiver(json))
}

export const DatarolesRever = () => ({
  type:types.REQUEST_GET_SY_ROLES
})

export const DatarolesReverRiver = (json) => ({
  type:types.RETIVE_GET_SY_ROLES,
  names:json.list
})



export const fetchPrivileges=()=>async (dispatch)=>{   //所有权限
  const json=await get.permissions()
  dispatch(getPrivileges(json))
}
export const getPrivileges=(json)=>({
  type:types.GET_PRIVILEGES,
  list:json.list
})

export const fetchPrivilDetail =(id) => async(dispatch) => {  //角色详情
  dispatch(roleDetail())
  const json = await get.privilegeDetail(id)

  dispatch(roleDetailRiver(json))
}

export const roleDetail = (json ) =>({
  type:types.GET_PRIVILEGES_ROLE
})

export const roleDetailRiver = (json)=>({
   type:types.GET_PRIVILEGES_ROLENAMW,
   names:json
})


export const RoleUserAll= (id) =>async(dispatch) => {  //角色分配
  dispatch(RoleUserAllDataRive())
  const json = await get.privilegeUser(id)
  dispatch(RoleUserAllData(json))
}
export const RoleUserAllDataRive =() =>({
  type:types.GET_PRIVILEGES_ROLEUSRALLNAME
})
export const RoleUserAllData = (json) => ({
  type:types.GET_PRIVILEGES_ROLEUSRALL,
  names:json
})

export const getUsers=(json)=>({  //所有人员
  type:types.GET_PRIVILEGES_ROLEUSRALL_USER,
  list:json.list
})
export const fetchUsers=()=>async (dispatch)=>{
  const json=await get.users('')
  
  dispatch(getUsers(json))
}


export const fetchUserName = () => async(dispatch) =>{
   const json = await get.titleName()
   
    dispatch(AllUserpermissions(json))
}
export const AllUserpermissions =(json)=>({
  type:types.GEUTALLUSERPERMISSIONS, 
  data:json.menus
})











