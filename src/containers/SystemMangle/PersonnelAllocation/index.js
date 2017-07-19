import React,{Component} from 'react'
import {Spin,Button,Menu,Icon,message,Input,AutoComplete} from 'antd'
import Post from '../../../api/Post'
import Get from '../../../api/Get'
import UserData from '../../../components/UserData'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Modal from '../../../components/Modal'
import './index.css'
import QueryConditions from '../../../components/QueryConditions'
import * as actions from '../../../actions'

class PersonnelAllocation extends Component{
	constructor(props) {
		super(props);
		this.state={
			data:[],
			type:90, //类型
			types:true
		}
	}
	componentDidMount() {
		this.GetLatestFaultWorkOrderList()

	}
	GetLatestFaultWorkOrderList(){
		const {actions} = this.props
		actions.fetchUsers()

		actions.fetchPrivileges()
	}
	handle(value){
		console.log(value)
	}

	render(){
		
		return(
				<div className="DefectsNm flex flex-1 PersonnelAllocation">				
					<div className="headerData flex-0">
						<QueryConditions  type={this.state.type} types={this.state.types}/>
					</div>
					<div className="contentData flex-1 flex">
						<div className="Role-nav">
							<UserData data={this.props.User}/>
						</div>
						<div className="Role-wrapper">
							{this.props.children}
						</div>						
					</div>
									
				</div>
			)
	}
}
const mapStateToProps=state=>{
	const {User} = state
	return {
		User
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PersonnelAllocation))