import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'
import settingState from './title'
import station from './station'
import commonData from './commonData'
import GEtstation from './Getstaiton'
import PostSelect from './PostSelect'
import TypesDetail from './TypesDetail'
import loading from './loading'
import department from './department'
import journalData from './journalData'
import ruleData from './ruleData'
import rulePeo from './rulePeo'
import DataName from './DataName'
import DataTime from './DataTime'
import journalDetail from './journalDetail'
import DataNameShiofe from './DataNameShiofe'
import journalSelectData from './journalSelectData'
import DataRoleShiofe from './DataRoleShiofe'
import Laway  from './Laway'
import RoleDetail from './RoleDetail'
import AllRuleUser from './AllRuleUser'
import User from './User'
import AllPressmisonm from './AllPressmisonm'
const rootReducer = combineReducers({
	settingState,
	station,
	commonData,
	GEtstation,
	PostSelect,
	TypesDetail,
	loading,
	department,
	journalData,
	ruleData,
	rulePeo,
	DataName,
	DataTime,
	journalDetail,
	DataNameShiofe,
	journalSelectData,
	DataRoleShiofe,    //所有角色
	Laway,
	RoleDetail,
	AllRuleUser,
	User,
	AllPressmisonm


	
	
})

export default rootReducer

