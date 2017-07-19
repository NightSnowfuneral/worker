import React,{Component} from 'react'
import {Spin,Button,Menu,Icon,message} from 'antd'

import Post from '../../../api/Post'
import Get from '../../../api/Get'
import NavbarData from '../../../components/NavbarData'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Modal from '../../../components/Modal'
import './index.css'
import * as actions from '../../../actions'
import {switchFormat,isSwitchFormat,DynamicTitleName,addBtn} from '../../../api/Format'
const post = new Post()
const get = new Get()

class RoleManagement extends Component{
	constructor(props) {
		super(props);
		this.state={
			names:[],
			showModal:false,
			modalWidth:"",
			modalTitle:"",
			DataTitle:"",
			DataTypes:Number,
			data:[],
			title:"所有角色",
			DataNumer:Number


		}
	}
	componentDidMount() {
		this.GetLatestFaultWorkOrderList()
		this.haneName()  //所有权限
		this.props.router.replace('/system/Role/dispose/1')
	}


	async GetLatestFaultWorkOrderList(){  //所有权限		
		const {actions} = this.props
		actions.Dataroles()
	}
	haneName(){
		const {actions} = this.props
		actions.fetchPrivileges()
	}
	addBtn(){
		this.showModal()
	    this.setState({modalWidth:"960px",modalTitle:"新增角色",request:true,details:true,NameTYpe:90})
		
	}

	showModal(){                //页面添加
		const {actions} = this.props
		this.setState({
			showModal:true
		})
	}
	closeModal(){  //关闭弹窗
		const {actions} = this.props
		this.setState({
			showModal:false
		})
	}
	async deleteBtn(id){
		const res = await post.DelectRoleData(id)
		if (res.code == 200) {
			this.GetLatestFaultWorkOrderList()
			message.success("删除成功")
			if (id == this.state.DataNumer) {
			 	this.props.router.replace('/system/Role')
			 } 
		}
		
	}
	delete(id){  //删除角色
		this.showModal()
		this.setState({modalWidth:"300",modalTitle:"提示",data:id,DataTitle:"删除该角色",DataTypes:90,workID:false,NameTYpe:40})
	}
	onChang(id){
		this.setState({
			DataNumer:id
		})
	}

	render(){
		const {modalWidth,modalTitle,showModal,DataNumer} = this.state
		const title = "新增角色"
		var {state} = this.props.location
		
		return(

					<div className="DefectsNm flex flex-1 RoleManagement">
								<div className="headerData flex-0">
									<Button className="editable-addName-btn" type="ghost" onClick={this.addBtn.bind(this)} >
											新增角色
									</Button>
									
								</div>
								<div className="contentData flex-1 flex">
									<div className="Role-nav">
										<NavbarData  data = {this.props.names}  detele={this.delete.bind(this)} onChange={this.onChang.bind(this)}/>
									</div>
									<div className="Role-wrapper">
										{this.props.children}
									</div>
								</div>
								<Modal 
									ref="modal"								
									modalWidth={modalWidth}
									modalTitle={modalTitle}
									visible={showModal}
									DataTypes={this.state.DataTypes}
									closeModal={this.closeModal.bind(this)}
									NameTYpe={this.state.NameTYpe}
									DataTitle={this.state.DataTitle}
									DatauploadName={this.deleteBtn.bind(this)}
									data = {this.state.data}
								/>
								
						</div>
			)
	}
}
const mapStateToProps=state=>{
	const {DataRoleShiofe} = state
	const { names,isFetching} = DataRoleShiofe || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RoleManagement))