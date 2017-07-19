import React,{Component} from 'react'
import { Form, Input, Icon, Button, Spin, message,Checkbox } from 'antd'
import './index.css'
import Get from '../../api/Get'
import Post from '../../api/Post'

import * as actions from '../../actions'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {switchFormat,isSwitchFormat,noSwitchFormat} from '../../api/Format'
import {bindActionCreators} from 'redux'
import {BasicFormDataAddTo,OperationaAdd,assignment,RoleName} from '../../utils/config'
const FormItem = Form.Item;
const post = new Post()
const get = new Get()
var pattern = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\(\)\（\）\!\！\,\.\?\[\]\{\}\ \。\-\_\+\=\“\”\"\"\'\'\‘\'\n\r\s\，\;\；\·\、\.]/g 
class MangerFooter extends Component{
	constructor(props) {
		super(props);
		this.state={
			isFetching:false,
			FormData:[],
			fetching:true,
			permissions:[],
			privilegeDetail:{},
			isPrivilegeList:[],
			noPrivilegeList:[]
		}
	}
	componentDidMount() {
		this.setData() //赋值
		this.setDateName() //获取初始的所有的权限
		
		this.handler()
		
		
	}
	async setDateNameEdit(decoReacr,data){
			
			if (decoReacr.privilege) {
				this.setState({
				privilegeDetail:decoReacr.privilege,
				isPrivilegeList:isSwitchFormat(data,decoReacr.privilege.privilege),
				noPrivilegeList:noSwitchFormat(data,decoReacr.privilege.privilege)

		})
	}
 }
		
	
	componentWillReceiveProps(nextProps) {
		
		var data = this.props.Laway
		data.map((item,i)=>{
				
				item.type = "remember"
				item.rowCn = 'row-11'
				item.value = false

			}) 
		var decoReacr = nextProps.names

			if (decoReacr !== this.props.names ) {
				this.setState({
					fetching:true,
					isPrivilegeList:[],
					noPrivilegeList:[]
				})
				this.setDateNameEdit(decoReacr,data)
				this.handler()
				

			}
			if (decoReacr !== this.props.names ) {
				this.handleReset()
			}
			
			
		
	}
	async setDateName(){  //获取初始的所有的权限创集时
		const res = await get.permissions()
		
		if (res.code == 200) {
			let resName = res.list
			resName.map((item,i)=>{
				
				item.type = "remember"
				item.rowCn = 'row-11'
				item.value = false

			}) 
			this.setState({
				permissions:resName
			})
		}
	}
	setData(){  //初始值
		this.setState({
			FormData:RoleName
		})
	}
	handler(){   //加载提示
		setTimeout(()=>{
			this.handleNameData()
		},800)
	}
	handleNameData(){  //改变状态
		this.setState({
			fetching:false
		})
	}
	handleSubmit(e){   
		          //提交表单的概念
		e.preventDefault()  //取消事件的默认动作。
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			if (!err) {
				
				var data = {}
				data.name = value.name
				data.description = value.description
				data.privilege = switchFormat(value)

				

				if (pattern.test(data.description)) {

					message.success("具有特殊字符请重新输入")
					return
				}
				if (pattern.test(data.privilege)) {
					message.success("具有特殊字符请重新输入")
					return
				}
				if (this.props.paramId) {
					const res = await post.putRole(data,this.props.paramId)
					if (res.code == 200) {
						this.handleReset()
						this.props.closeModal()
						message.success("角色权限更新成功")
						if (data.name !== this.props.names.privilege.name &&!this.props.refresh ) {
							const {actions} = this.props
							actions.Dataroles()
						}
						if (!this.props.refresh) {
							this.props.paramIdData(this.props.paramId)
						}
						if (data.name !== this.props.names.privilege.name) {
							this.props.paramIdData(this.props.paramsId)
						}

						this.setState({
							isPrivilegeList:[],
							noPrivilegeList:[]
						})
						
						
						
					}
					else{
						message.err("角色权限更新失败")
					}
				}
				else{
						const res = await post.roleSwitcg(data)
				
						if (res.code == 200) {
							this.handleReset()
							this.props.closeModal()
							message.success("规则提交成功")
							const {actions} = this.props
							actions.Dataroles()
							this.setState({
							isPrivilegeList:[],
							noPrivilegeList:[]
							})
						}
						else{
							message.err("角色创建失败")
						}
				}
				
			
			
			}
			else{
				message.error("请完善信息")
			}

			
		})
	}
	renderFormItem(item, i,value){   //全部的from表单外表表头
		let formItem=
				<div style={{width:"100%",textAlign:'center'}}> 
					<FormItem
						key={item.dataIndex}
						className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
						label={item.title}
					>
						{this.formClassiFication(item,value)}
					</FormItem>
				</div>

		return formItem
	}
	renderFromItemName(item,i,value){  //为每个表单添加样式
		let formItem=
					<div className="" style={{display:'inline-block',width:'33.3%',textAlign:'center'}}>
					<FormItem
						key={item.dataIndex}
						className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
						label={item.title}
					>
						{this.formClassiFication(item,value)}
					</FormItem>
					</div>
				

		return formItem
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
	}
	operationsUpload(){ //运维数据上传
		return(
				<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'center'}}>
							{!this.props.paramId &&<Button key="back" type="ghost" size="large"  onClick={this.handleReset.bind(this)}> 重置</Button> }
							<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">{this.props.paramId ? "确认修改" : "角色创建"}</Button>
							
				</div>
			)

	}
	formClassiFication(item,value){  //根据表单的不同分配不同的样式  或输入 或下拉
		const {getFieldDecorator} = this.props.form
		const {privilegeDetail} = this.state
		
		switch(item.type) {
			case 'Foundpeople': //填报人
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:this.props.paramId ? privilegeDetail.name : "" ,
								rules:[{required: item.require, message:'请输入缺陷描述内容' + item.title}]
							})(
								<Input disabled={item.disabled}  disableautocomplete autocomplete="off" />
							)
						)
				break

				case 'textareaFound':                                                                     //缺陷情况
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:this.props.paramId ? privilegeDetail.description : "" ,
							rules:[{required: item.require, message:'请输入缺陷描述内容' + item.title}]
						})(
							<Input disabled={item.disabled}
								type="textarea"
								autosize={{minRows:2, maxRows:6}}
								disableautocomplete autocomplete="off"
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
								<Checkbox >{item.name}</Checkbox>
							)
					)


				}
			}
	undistributed(isPrivilegeList){
		const deiv = <div className="scheduling_flwcName" style={{marginTop:"10px"}}>
	        				<div className="scheduling_flwcName_title">
	        					已分配权限
	        				</div>
	        				<div className="scheduling_flwc_bottomName">
	        					{ isPrivilegeList.map((item,i)=>this.renderFromItemName(item,i,true))}
	        				</div>
	        			</div>
	    return deiv
	}
	allocated(noPrivilegeList){
		const cm =  <div className="scheduling_flwcName" style={{marginTop:"30px",marginBottom:'25px'}}>
	        				<div className="scheduling_flwcName_title" style={{marginTop:'0px'}}>
	        					未分配的
	        				</div>
	        				<div className="scheduling_flwc_bottomName">
	        					{ noPrivilegeList.map((item,i)=>this.renderFromItemName(item,i,false))}
	        				</div>
	        			</div>
	    return cm
	}
	render(){
		const{FormData,permissions,privilegeDetail,isPrivilegeList,noPrivilegeList} = this.state
		
		
		return(
				<Spin
	        	  tip="加载中"
	          	  spinning={this.state.fetching}
	          	  style={{width:"100%"}}
	        	>
	        		<Form className="flex flex-wrap" onSubmit={this.handleSubmit.bind(this)}>
	        			{FormData.map((item,i)=>this.renderFormItem(item,i,false))}
	        			<div className="scheduling_flwc">
	        				<div className="scheduling_flwc_bottom">
	        					{this.props.paramId ? "": permissions.map((item,i)=>this.renderFromItemName(item,i,false))}
	        				</div>
	        			</div>
	        			{this.props.paramId && isPrivilegeList.length !==0 ? this.undistributed(isPrivilegeList) : ""}
	        			{this.props.paramId && noPrivilegeList.length !==0 ? this.allocated(noPrivilegeList) : ""}
	        			{this.operationsUpload()}
					</Form>
	        	</Spin>
			)
	}
}

const FromBar = Form.create()(MangerFooter)
const mapStateToProps=state=>{
	const {RoleDetail,Laway} = state
	const { names,isFetching} = RoleDetail || {names:[],isFetching:true}
	return {
		isFetching,
		names,
		Laway
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(FromBar)


