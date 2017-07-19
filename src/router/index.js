import React from 'react'
import {  Router,Route, browserHistory,hashHistory ,IndexRoute} from 'react-router'
import Admin from '../components/Admin'
import home from '../containers/Dashboard'

const redirectToLogin=(nextState, replace)=>{
	if(!sessionStorage.LoginId){
		replace('/login')
	}
}
const redirectToDashboard=(nextState, replace)=>{
	if(sessionStorage.LoginId){
		replace('/')
	}
}

const rootRoute = {
	getComponent:(nextState,cb)=>{
		return require.ensure([],(require)=>{
			cb(null,require('../components/Admin'))
		})
	},
	childRoutes:[
		{	
			onEnter: redirectToDashboard,
			path:'/login',
			getComponent:(nextState, cb) => {
				require.ensure([], (require) => {
					cb(null,require('../containers/Login'))
				})
			}
		},
		{
			path:'/logout',
			getComponent:(nextState, cb) =>{
				require.ensure([], (require) => {
					cb(null,require('../containers/Logout'))
				})
			}
		},
		{onEnter: redirectToLogin,
			path:'/',
			getComponent: (nextState, cb) => {
				return require.ensure([], (require) =>{
				cb(null, require('../containers/Dashboard'))
			})
		},
		childRoutes:[
			{
				path:'/defects',
				getComponent:(nextState, cb) =>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/Defects'))
	      	  		})
				},
				childRoutes:[
					{
						path:"/defects/management",
						getComponent:(nextState, cb) => {
							require.ensure([], (require)=>{
						cb(null, require('../containers/Defects/Management'))
	      	  				})		
						}
					},
					{
						path:"/defects/query",
						getComponent:(nextState, cb) =>{
							require.ensure([], (require) =>{
								cb(null, require('../containers/Defects/Query'))
							})
						}

					},
					{
						path:"/defects/current",
						getComponent:(nextState, cb) => {
							require.ensure([],(require) =>{
								cb(null, require("../containers/Defects/Current"))
							})
						}
					}
				]

			},
			{
				path:'/operations',                  //运维日志
				getComponent:(nextState, cb) =>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/Log/operations'))
	      	  		})
				},
			},
			
			{
				path:'/logquery',    //日志搜索
				getComponent:(nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/Log/LogSearch'))
					})
				}
			},
			{
				path:'/statistics',    //值班统计
				getComponent:(nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/scheduling/statisticsData'))
					})
				}
			},
			{
				path:'/regulation',    //值班统计
				getComponent:(nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/scheduling/regulationData'))
					})
				}
			},
			{
				path:'/Schedulin',    //值班统计
				getComponent:(nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/scheduling/PersonnelScheduling'))
					})
				}
			},
			{
				path:'/replace',    //值班统计
				getComponent:(nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, require('../containers/scheduling/replace'))
					})
				}
			},
			{
				path:'/system',
				getComponent:(nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('../containers/SystemMangle'))
					})
				}
			},
			{
				path:'/system/Personnel',
				getComponent:(nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('../containers/SystemMangle/PersonnelAllocation'))
					})
				},
				childRoutes:[
					{
						path:'/system/Personnel/Assign/:id',
						getComponent:(nextState,cb)=>{
							require.ensure([],(require)=>{
								cb(null,require('../components/AssignRoles'))
							})
						}
					}
				]
			},
			{
				path:'/system/Role',
				getComponent:(nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('../containers/SystemMangle/RoleManagement'))
					})
				},
				childRoutes:[
					{
						path:'/system/Role/dispose/:id',
						getComponent:(nextState,cb)=>{
							require.ensure([],(require)=>{
								cb(null,require('../components/Dispose'))
							})
						}
					}
				]
			}
			

		]	
	}
	]
}



const routes =(
	<Router 
		history={browserHistory}
		routes={rootRoute}
	/>

)

export default routes