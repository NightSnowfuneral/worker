import React,{Component} from 'react'
import {connect} from 'react-redux'
import { withRouter,Link } from 'react-router'
import Get from '../../api/Get'
import Post from '../../api/Post'
import {switchFormat,isSwitchFormat,isSwitcxhName,noSwitchFormat} from '../../api/Format'
import classnames from 'classnames'
import * as actions from '../../actions'
import './index.css'
import Modal from '../Modal'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import {BasicFormDataAddTo,OperationaAdd,assignment,RoleName,RoleNameEdit,RoleNameDetaol} from '../../utils/config'
import {bindActionCreators} from 'redux'
const post = new Post()
const get = new Get()
const FormItem = Form.Item
class AssignRoles extends Component{
	constructor(props) {
		super(props);
		this.state={
			fetching:true,
			user:[],
			roles:[],
			FormData:[],
			showModal:false, //弹窗
			NameTYpe:Number,
			modalWidth:"",
			modalTitle:"",
			params:"",
			paramsId:Number,
			refresh:true //不需要刷新

		}
	}
	componentDidMount() {
		this.GetLatestFaultWorkOrderList( this.props.params.id)
		this.handler()
		
	}
	componentWillReceiveProps(nextProps) {
		this.GetLatestFaultWorkOrderList(nextProps.params.id)

		if (nextProps.params !== this.props.params) {

			this.setState({
			fetching:true,
			user:[],
			roles:[]
		})
			this.handler()
		}

	}
	
	async GetLatestFaultWorkOrderList(id){  //获取数据
		const res1 = await get.UserDetail(id)
		const res2 = await get.PossessRoles()
		if (res1.code ==200 &&res2.code == 200) {
			var array = []
		
			RoleNameDetaol.map((item,i)=>{
				this.setFormDataValue(item,res1.user)
				array.push(item)
			})
			this.setState({
				user:res1.user,roles:isSwitcxhName(res2.list),FormData:array,paramsId:id
			})
		}
		else{
			var array = []
			RoleNameDetaol.map((item,i)=>{
				item.value = ""
				array.push(item)
			})
			message.error("无数据")
			return
		}
		
		
		
		
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
	RoleChange(id){   //角色权限
		if (id == 1) {
			message.success("超级管理员不允许修改")
			return
		}
		this.showModal()
		this.setState({modalWidth:"960px",modalTitle:"新增角色",request:true,details:true,NameTYpe:90,params:id})
		
		const {actions} = this.props
		actions.fetchPrivilDetail(id)

	}
	formClassiFication(item,value){  //根据表单的不同分配不同的样式  或输入 或下拉
		const {getFieldDecorator} = this.props.form
		const {privilegeDetail} = this.state
		switch(item.type) {
			case 'Foundpeople': //填报人
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:'请输入缺陷描述内容' + item.title}]
							})(
								<Input disabled={item.disabled} autocomplete="off"  />
							)
						)
				break
				case 'textareaFound':                                                                     //缺陷情况
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
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
								initialValue: value,
								
							})(
								
								<Checkbox checked={this.state.checked ? !value : value}>{item.name}</Checkbox> 

							)
					)


				}
			}
	renderFromItemName(item,i,value){  //为每个表单添加样式
		let formItem=
					<div className="specicol" >
						<FormItem
							key={item.dataIndex}
							className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
							label={item.title}
						>
							{this.formClassiFication(item,value)}
						</FormItem>
						<div className="edittPlus" onClick={this.RoleChange.bind(this,item.id)}>
							<Icon type="edit" className="colorIcon"/>
						</div>
					</div>
				

		return formItem
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
	handleLinkClick(e){
		e.preventDefault()  //取消事件的默认动作。
		this.props.form.validateFieldsAndScroll( async (err, value) => {
				
				var data = {}
				data.roles = switchFormat(value)
				const res = await post.putUserDetail(data,this.props.params.id)
				if (res.code == 200) {
					this.props.router.replace('/system/Personnel')
					message.success("角色分配成功")
				}
				else{
					message.err("角色分配成功")
				}
				
			})
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
	render(){
		const {user,roles,showModal,modalWidth,modalTitle,params} = this.state
		const isUserList=isSwitchFormat(roles,user.roles)  //获取已经分配的角色
		const noUserList=noSwitchFormat(roles,user.roles)
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
	        			{RoleNameDetaol.map((item,i)=>this.renderFormItem(item,i))}
	        			<div className="titleShorg" style={{marginTop:"30px",marginBottom:'0'}} >
	        				已分配的角色
	        			</div>
	        			<div className="scheduling_flwc_Role" >
	        				<div className="scheduling_flwc_bottomName" style={{fontSize:"12px"}}>
	        					{isUserList.map((item,i)=>this.renderFromItemName(item,i,true))}
	        				</div>
	        			</div>
	        			<div className="titleShorg" style={{marginTop:"30px",marginBottom:'15px'}} >
	        				未分配的角色
	        			</div>
	        			<div className="scheduling_flwc_Role" >
	        				<div className="scheduling_flwc_bottomName" style={{fontSize:"12px"}}>
	        					{noUserList.map((item,i)=>this.renderFromItemName(item,i,false))}
	        				</div>
	        			</div>
	        			<div className="" style={{width:"80%", marginTop:"64px",textAlign:'center'}}>
	        					<Button type="primary" onClick={this.handleLinkClick.bind(this)}>确定分配</Button>
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
						refresh = {this.state.refresh}
						paramIdData={this.GetLatestFaultWorkOrderList.bind(this)}
						paramsId = {this.state.paramsId}
	        		/>
	        	</Spin>
			)
	}
}
const FromBar = Form.create()(AssignRoles)
const mapStateToProps = (state) =>({
	privilegesList:state.Laway,
})
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FromBar))