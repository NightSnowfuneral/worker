import React,{Component} from 'react'
import { Form, Input, Icon, Button, Spin, message,Checkbox } from 'antd'

import Get from '../../api/Get'
import Post from '../../api/Post'

import * as actions from '../../actions'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {switchFormat,isSwitchFormat,noSwitchFormat} from '../../api/Format'
import {bindActionCreators} from 'redux'
import {BasicFormDataAddTo,OperationaAdd,assignment,RoleName} from '../../utils/config'
const FormItem = Form.Item


const post = new Post()
const get = new Get()
class AllotUser extends Component{
	constructor(props) {
		super(props);
		this.state={
			fetching:true,
			roleUser:[],
			noRoleUse:[]
		}
	}
	componentDidMount() {
		this.handler()
	}
	componentWillReceiveProps(nextProps) {
		var dataSoure = nextProps.names
		if (dataSoure !== this.props.names) {
			this.SateName(dataSoure)
			this.setState({
					fetching:true
				})
			this.handler()

		}
	}
	SateName(dataSoure){
		if (dataSoure.list) {
		dataSoure.list.map((item,i)=>{
			item.type = "remember"
			item.rowCn = 'row-11'
			item.value = false
		})
		dataSoure.exclude.map((item,i)=>{
			item.type = "remember"
			item.rowCn = 'row-11'
			item.value = false
		})
	}
		
		
		this.setState({
			roleUser:dataSoure.list ? dataSoure.list : [] ,
			noRoleUse:dataSoure.exclude ? dataSoure.exclude : []
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
	formClassiFication(item,value){  //根据表单的不同分配不同的样式  或输入 或下拉
		const {getFieldDecorator} = this.props.form
		const {privilegeDetail} = this.state
		
		switch(item.type) {
			
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
	async handleSubmit(e){
			          //提交表单的概念
		e.preventDefault()  //取消事件的默认动作。
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			const data={}
			data.users=switchFormat(value)
			
			const res = await post.putRoleUser(data,this.props.paramId)
			if (res.code == 200) {
				this.handleReset()
				this.props.closeModal()
				message.success("角色权限更新成功")
				this.props.paramIdData(this.props.paramId)
				this.setState({
							roleUser:[],
							noRoleUse:[]
						})
			}
		})
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()

	}
	render(){
		const {roleUser,noRoleUse}=this.state
		
		return(
				<Spin
	        	  tip="加载中"
	          	  spinning={this.state.fetching}
	          	  style={{width:"100%"}}
	        	>
		        	<Form className="flex flex-wrap" onSubmit={this.handleSubmit.bind(this)}>
		        		<div className="scheduling_flwcName" style={{marginTop:"10px"}}>
	        				<div className="scheduling_flwcName_title">
	        					已分配人员
	        				</div>
	        				<div className="scheduling_flwc_bottomName">
	        					{roleUser.map((item,i)=>this.renderFromItemName(item,i,true))}
	        				</div>
	        			</div>
	        			<div className="scheduling_flwcName" style={{marginTop:"30px"}}>
	        				<div className="scheduling_flwcName_title">
	        					未分配人员
	        				</div>
	        				<div className="scheduling_flwc_bottomName">
	        					{noRoleUse.map((item,i)=>this.renderFromItemName(item,i,false))}
	        				</div>
	        			</div>
	        			<div className="antd-modal-footer" style={{width:"100%", marginTop:"36px",textAlign:'center'}}>
							<Button key="back" type="ghost" size="large"  onClick={this.handleReset.bind(this)}>重置</Button>
							<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">确定分配</Button>
							
						</div>
		        	</Form>
	        	</Spin>
			)
	}
}


const FromBar = Form.create()(AllotUser)
const mapStateToProps=state=>{
	const {AllRuleUser} = state

	const { names,isFetching} = AllRuleUser || {names:[],isFetching:true}
	return{
		names,isFetching
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(FromBar)