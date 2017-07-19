import React,{Component} from 'react'
import {connect} from 'react-redux'
import { withRouter,Link } from 'react-router'
import Get from '../../api/Get'
import Post from '../../api/Post'
import {switchFormat,isSwitchFormat} from '../../api/Format'
import classnames from 'classnames'
import * as actions from '../../actions'
import './index.css'
import Modal from '../Modal'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import {BasicFormDataAddTo,OperationaAdd,assignment,RoleName,RoleNameEdit} from '../../utils/config'
import {bindActionCreators} from 'redux'
const get = new Get()
const FormItem = Form.Item
class Disponse extends Component{
	constructor(props) {
		super(props);
		this.state ={
			FormData:[],//表单标题
			submitBtnLoading:false,
			privilegeDetail:{},
			isPrivilegeList:[],
			roleUser:[],
			showModal:false, //弹窗
			fetching:true,
			NameTYpe:Number,
			modalWidth:"",
			modalTitle:"",
			params:""



		}
	}
	componentDidMount() {
		this.GetLatestFaultWorkOrderList(this.props.params.id)
		this.filter()
		this.handler()

	}
	GetLatestFaultWorkOrderListData(data){
		
	}
	async GetLatestFaultWorkOrderList(data){
		
		
		const res1 = await get.privilegeDetail(data)
		const res2 = await get.privilegeUser(data)
		let isPrivilegeList = []
		if (res1.code == 200) {
			 isPrivilegeList=isSwitchFormat(this.props.privilegesList,res1.privilege.privilege)	
		}
		
		
		this.setState({
			privilegeDetail:res1.privilege,
			roleUser:res2.list,
			isPrivilegeList,
			params:data
		})
	}
	

	componentWillReceiveProps(nextProps) {
		this.GetLatestFaultWorkOrderList(nextProps.params.id)
		this.setState({
			fetching:true
		})
		this.handler()
	}
	filter(){   //把数据放入
		RoleNameEdit.map((item,i)=>{
			this.setFormDataValue(item,this.state.privilegeDetail)
		})
		this.setState({
			FormData:RoleNameEdit
		})
		
	}
	setFormDataValue(item,options){   //分配标题
		for (let value in options) {
				if (item.dataIndex == value &&  options[value] !== null) {
					item.value = options[value]		
				}

			}
		}
	renderFormItem(item, i){   //全部的from表单外表表头
		let formItem=
				<div style={{width:"100%",textAlign:'center'}}> 
					<FormItem
						key={item.dataIndex}
						className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
						label={item.title}
					>
						{this.formClassiFication(item)}
					</FormItem>
				</div>

		return formItem
	}
	formClassiFication(item){  //根据表单的不同分配不同的样式  或输入 或下拉
		const {getFieldDecorator} = this.props.form
		const {privilegeDetail} = this.state
		switch(item.type) {
			case 'Foundpeople': //填报人
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:privilegeDetail.name,
								rules:[{required: item.require, message:'请输入缺陷描述内容' + item.title}]
							})(
								<Input disabled={item.disabled} autocomplete="off"  />
							)
						)
				break
				case 'textareaFound':                                                                     //缺陷情况
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:privilegeDetail.description,
							rules:[{required: item.require, message:'请输入缺陷描述内容' + item.title}]
						})(
							<Input disabled={item.disabled}
								type="textarea"
								autosize={{minRows:2, maxRows:6}}
								autocomplete="off" 
							/>
						)
					)
				break;
				case 'remember':
				return(
						getFieldDecorator('privilege-'+ item.id,{
								valuePropName: 'checked',
								initialValue: item.value,
								
							})(
								<Checkbox >{item.name}</Checkbox>
							)
					)


				}
			}
	renderFormItemDiv(item){
		const Dane = <div className="scheduling_flwc_Role_Div" >
						{item.name}
					</div>
		return Dane
	}
	closeModal(){  //关闭弹窗
		const {actions} = this.props
		this.setState({
			showModal:false
		})
	}
	showModal(){                //页面添加
		const {actions} = this.props
		this.setState({
			showModal:true
		})
	}
	handleNameData(){
		this.setState({
			fetching:false
		})
	}
	handler(){   //加载提示
		setTimeout(()=>{
			this.handleNameData()
		},800)
	}
	RoleChange(){   //角色权限
		if (this.state.params == 1) {
			message.success("超级管理员不允许修改")
			return
		}
		this.showModal()
		this.setState({modalWidth:"960px",modalTitle:"修改角色",request:true,details:true,NameTYpe:90})
		const {actions} = this.props
		actions.fetchPrivilDetail(this.state.params)
		

	}
	handleLinkClick(){
		if (this.state.params == 1) {
			message.success("超级管理员不允许修改")
			return
		}
		this.showModal()
		this.setState({modalWidth:"960px",modalTitle:"人员配置",request:true,details:true,NameTYpe:100})
		const {actions }= this.props
		actions.RoleUserAll(this.state.params)
	}
	render(){
		const {FormData,roleUser,isPrivilegeList,showModal,modalWidth,modalTitle,params} = this.state
		
		return(
				<Spin
	        	  tip="加载中"
	          	  spinning={this.state.fetching}
	          	  style={{width:"100%"}}
	        	>
	        		<Form className="flex flex-wrap">
	        			<div className="titleShorg">
	        				角色基础信息
	        			</div>
	        			{FormData.map((item,i)=>this.renderFormItem(item,i))}
	        			<div className="titleShorg" style={{marginTop:"16px",marginBottom:'16px'}} >
	        				已分配的人员
	        			</div>
	        			<div className="scheduling_flwc_Role" >
	        				<div className="scheduling_flwc_bottomName" style={{fontSize:"12px"}}>
	        					{roleUser.map((item,i)=>this.renderFormItemDiv(item,i))}
	        				</div>
	        				<div className="" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
	        					<Button type="primary" onClick={this.handleLinkClick.bind(this)}>人员分配</Button>
	        				</div>
	        			</div>
	        			<div className="titleShorg" style={{marginTop:"30px",marginBottom:'15px'}} >
	        				已分配的权限
	        			</div>
	        			<div className="scheduling_flwc_Role" >
	        				<div className="scheduling_flwc_bottomName" style={{fontSize:"12px"}} >
	        					{isPrivilegeList.map((item,i)=>this.renderFormItemDiv(item,i))}
	        				</div>
	        				<div className="" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
	        					<Button type="primary" onClick={this.RoleChange.bind(this)}>角色修改</Button>
	        				</div>
	        			</div>
	        		</Form>
	        		<Modal
	        			ref="modal"														
						visible={showModal}
						closeModal={this.closeModal.bind(this)}
						modalWidth={modalWidth}
						modalTitle={modalTitle}
						NameTYpe={this.state.NameTYpe}
						paramId = {params}
						paramIdData={this.GetLatestFaultWorkOrderList.bind(this)}
						
	        		/>

	        	</Spin>
			)
	}
}
const FromBar = Form.create()(Disponse)
const mapStateToProps = (state) =>({
	privilegesList:state.Laway,
})
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default  connect(mapStateToProps,mapDispatchToProps)(FromBar) 