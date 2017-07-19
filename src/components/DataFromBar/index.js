import React,{Component} from 'react'
import "./frombar.css"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import * as actions from '../../actions'
import moment from 'moment'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import {BasicFormDataAddTo,OperationaAdd,assignment } from '../../utils/config'
import './frombar.css'
import Get from '../../api/Get'
import Post from '../../api/Post'




const FormItem = Form.Item
const Option = Select.Option
const {RangePicker} = DatePicker

const post = new Post()
const get = new Get()
class CustomFromBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			FormData:[],//表单标题
			submitBtnLoading:false,
			data:[],//所有初数据
			qxdj:[],//缺陷等级
			qxlx:[], //缺陷类型
			shr:[],   //处理人
			value:[],                           
			searchValue:'',
			listData:[],
			organization:[], //组织机构
			department:[], //部门下人员
			duty:[],//值班人员
			SelectDuty:[], //所有的排班人员
			titleID:{} //

		}
		
	}
	componentDidMount() {    //赋值
			this.filterForData()
			this.setOrganization() //获取下属
			this.setduty()  //获取白与晚值班人员
			this.handleReset()
			
		}

	filterForData(){  //赋值

		switch(this.props.types) {
			case 10:
				return this.setState({
				FormData:BasicFormDataAddTo 
			}) 

				break;
			case 20:
				return this.setState({
				FormData:OperationaAdd   //新增日志
			})
				break;
			case 40:
				return this.setState({ //角色
				FormData:assignment 
			})
				break;
		}
		// if (this.props.type) {
		// 	this.setState({
		// 		FormData:OperationaAdd 
		// 	})
		// }
		// else{
		// 	this.setState({
		// 		FormData:BasicFormDataAddTo 
		// 	})
		// }
	}

  	async setOrganization(){   //初始值部门打类
  
     const res= await get.organization()
     this.setState({
        organization: res.results
     })
    

    
     
  }
	async setCommonData(){ //获取初始值
			var Common = await get.commonData()  //启动获取数据的函数
			
			if (Common.code == 200) {
				this.setState({
					data:Common,
					qxdj:Common.qxdj,
					qxlx:Common.qxlx,
					shr:Common.nextFlow.list,  //消缺人
					titleID:Common.nextFlow.titleID  //是不是消缺人
				})
			
			}

			
			
		}
	async setduty(){  //取值
		switch(this.props.types) {
			case 20:
				const res = await get.duty('10')
				if (res.code == 200) {
					this.setState({
						duty:res.list
					})
				}
				break;
			case 40:
				
				this.assignment()
				break;
			case 10:
					this.setCommonData()
				break;
		}
		
		
		
	}
	rulesDetails(item){  //规则数据处理
		let data = [] 

		 for (var i = 0; i < item.plan.length; i++) {
		 	data.push(item.plan[i] + "   ")
		 }
		 item.plan = data
	}
	async assignment(){ //初始请求的数据
		const resData = await get.duty("9")  //请求值班人员
		
			if (resData.code == 200) {
			this.setState({
				    duty:resData.list
				})
			}
		const res = await get.schedulePlan()
		if (res.code == 200) {
			res.plans.map((item,i) =>{
				this.rulesDetails(item)   //规则
			})
			
			this.setState({
				    SelectDuty:res.plans
				})
			
			
		}
		
	}
	renderFormItem(item, i){   //全部的from表单外表
		let formItem=<FormItem
						key={item.dataIndex}
						className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
						label={item.title}
					>
						{this.formClassiFication(item)}
					</FormItem>
		return formItem
	}

	async hendleChange(value){    //厂站搜索启动
		const json = await get.station(value)
		if (json.code == 200) {
			this.setState({
			searchValue:value,
			listData:json.list
		})
	}

	
	}

	async hendleChangePeople(value){
		const id = value[1] ? value[1] : value[0]
		this.props.form.resetFields(['ContactPersonnel'])

		const res = await get.department(id)
		
		if (res.code == 200) {
			this.setState({
				department:res.users
			})	
		}
		
	}
	Data(){
		const data = new Date()
		return data
	}
	formClassiFication(item){  //根据表单的不同分配不同的样式  或输入 或下拉
		const {getFieldDecorator} = this.props.form
		const {data,listData,qxdj,shr,qxlx,duty,SelectDuty} = this.state
		
		
		switch(item.type) {
			case 'Foundpeople': //填报人
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:data.userName,
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled}  autocomplete="off"/>
							)
						)
				break
				
			case 'FoundpeopleTwo':
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							rules:[{required: item.require, message:"请选择"+item.title
							}]
						})(
						<Select 
									disabled={item.disabled}
									mode= {this.props.types == 40 ? "" : "multiple"}
								>
									{duty.map((item,i)=>{
										return(
												<Option key={item.id} value={item.id}>
													{item.name}
												</Option>
											)
									})}
								</Select>
						
						
					)

				)
				break
				
			case 'FoundDepartments': //填报部门
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled} autocomplete="off"/>
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
			case'textareaDeal':                                                                         //缺陷处理信息
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:'请输入' + item.title}]
							})(
								<Input disabled={item.disabled}
									type="textarea"
									autosize={{minRows:2, maxRows:6}}
									autocomplete="off"
								/>
							)
						)
				break;
			case 'selectFactory':                                 //厂站名称
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							rules:[{required: item.require, message:"请选择"+item.title
							}]
						})(
						<Select 
							disabled={item.disabled}
							mode="combobox"
							placeholder="输入厂站名称"
							optionFilterProp="children"
                			optionLabelProp="children" 
							labelInValue={false}
							
        					filterOption={false}
        					defaultActiveFirstOption={false}
        					onSearch={this.hendleChange.bind(this)}
        					
        					
						>
							{listData.map((item,i)=>{
								return(
										<Option key={item.name} value={item.id}>
											{item.name}
										</Option>
									)
							})}
						
						</Select>
					)

				)
				break
			case 'selectLevel':                                  //缺陷等级
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							rules:[{required: item.require, message:"请选择"+item.title
							}]
						})(
						<Select 
							disabled={item.disabled}
						>
							{
								qxdj.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}
							
						</Select>
							
						
						
					)

				)
				break
			case 'department':  //所属部门

              return(
                  getFieldDecorator(item.dataIndex,{
                          initialValue:item.value,
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <Cascader 
                          disabled={item.disabled}
                          options={this.state.organization}
                          placeholder="选择部门/人员"
                          onChange={this.hendleChangePeople.bind(this)}
                        >
                          
                        </Cascader>
                    )

                  
                )
            break;
			case 'selectType':             //缺陷类型
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
							>
								{
								qxlx.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}		
							
							</Select>
						)

					)
				break
			case 'selectDepartment':                        //处理部门
				return( 
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
								
							>
								{SelectDuty.map((item,i)=>{
								return(
										<Option key={item.name} value={item.id}>
											{item.plan}
										</Option>
									)
								})}
							</Select>
						)

					)
				break
			case 'selectPeople':               //处理人
				return( 
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
							>
								{
								shr.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}		
							</Select>
						)

					)
				break 
			case 'category':                //事件类别
				return(
						getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
							>
								{
								item.options.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}
							</Select>
						)
					)
				break
			case 'handover':   //是否交接
				return(
						getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
							>
								{
								item.options.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}
							
							</Select>
						)
					)
				break
			case'ContactPersonnel':   //联系人员
				return(
						getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{required: item.require, message:"请选择"+item.title
								}]
							})(
							<Select 
								disabled={item.disabled}
								mode="multiple"
								defaultActiveFirstOption={false}
								showArrow={false}
	        					filterOption={true}
	        					

							>
								
								{this.state.department.map((item,i) =>{
									return (
											<Option key={i} value={item.value}>
												{item.label}
											</Option>
										)
								})}
							</Select>
						)
					)
				break
			case 'DataPicker':              //时间
				return( 
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							rules:[{required: false, message:'时间' + item.title}]
						})(
							 <DatePicker
				              	disabled={item.disabled} 
				                showTime
				                format="YYYY-MM-DD HH:mm:ss"
				                placeholder="日期 时间"
			                	style={{width:"100%"}}
		          			  />
			                
							
						)
					)
				break

			default:
				

		
		}
	}

	handleSubmit(e){             //提交表单的概念
		e.preventDefault()
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			let newImage = []
			
			const dataValue = {}
			
		
			if (!err) {
				if (this.props.types == 20) {   //新建日志
				dataValue.type = value.category  //事件类型
				dataValue.record = value.eventContent //事件内容
				dataValue.comment = value.remarks //备注
				dataValue.shift = value.handover //是否交接
				dataValue.onSite = value.ContactPersonnel
				dataValue.day = value.shift //白班
				dataValue.night = value.Nightshift  //晚班

				
				const res = await post.shift_record(dataValue)
				
				if (res.code == 200) {
						message.success("日志提交成功")
						this.setState({submitBtnLoading:false})
						this.props.closeModal()
						this.handleReset()
						const {actions} = this.props
       					actions.journalData("")
					}	
				else{
					message.error("日志提交失败")
				}		

			}
				if (this.props.types == 10) {  //新增缺陷
				
			
				dataValue.images = newImage  //图片
				dataValue.qxdj = value.qxdj //缺陷等级
				dataValue.description = value.description //缺陷描述
				dataValue.stationID = value.stationID?value.stationID.toString() : "" //厂站ID
			
				dataValue.geoX =""  //厂站经度
				dataValue.geoY =""  //厂站维度
				dataValue.qxlx = value.qxlx //缺陷类型
				dataValue.status = '1' //提交
				dataValue.nextFlowUserID = value.handleUserID //审核人ID
				dataValue.nextFlowTitleID = this.state.titleID

				var str = dataValue.stationID
				var n = Number(str)
				if (!isNaN(n) && dataValue.stationID.length === 10) {
						const res = await post.postTypein(dataValue)
					if (res.code == 200) {
					 	message.success("缺陷提交成功")
					 	this.setState({submitBtnLoading:false})
					 	this.props.closeModal()
					 	this.handleReset()
					 	const data = {status:'0'}    //缺陷
						const {actions} = this.props
						return actions.fetchPostsIfNeeded(data)	
					 } 
					 else{
					 	message.error("缺陷提交失败")
					}
				}
				else{
					message.error("厂站不存在,请重新输入")
					this.props.form.resetFields(['stationID'])

				}
				
			}
			if (this.props.types == 40) {    //角色
				dataValue.planID = value.userID  //顺序错误
				dataValue.userID = value.planID  //顺序错误
				dataValue.date = value.date ? value.date.format('YYYY-MM-DD') :""
			
				const res = await post.schedule_user(dataValue)
				if (res.code == 200) {
				 	message.success("人员分配成功")
				 	this.setState({submitBtnLoading:false})
				 	this.props.closeModal()
				 	this.handleReset()
				 	const {actions} = this.props
					actions.RulePeole()

				 } 
				 else{
				 	message.error("人员分配失败")
				}
			}
			if (this.props.types == 60) {
				
			}
		}

			


	})

}
	handleHolds(e){   //暂存的概念
		e.preventDefault()
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			let newImage = []
			const dataValue = {}

			dataValue.images = newImage  //图片
			dataValue.qxdj = value.qxdj //缺陷等级
			dataValue.description = value.description //缺陷描述
			dataValue.stationID = value.stationID?value.stationID.toString() : "" //厂站ID
			dataValue.geoX =""  //厂站经度
			dataValue.geoY =""  //厂站维度
			dataValue.qxlx = value.qxlx //缺陷类型
			dataValue.status = '0' //提交
			dataValue.nextFlowUserID = value.handleUserID //审核人ID
			dataValue.nextFlowTitleID = this.state.titleID
			var str = dataValue.stationID
			var n = Number(str)
			if ((!isNaN(n) &&dataValue.stationID.length === 10) || dataValue.stationID == "" ) {
				
					const res = await post.postTypein(dataValue) 
					if (res.code == 200) {
					 	message.success("暂存成功")
					 	this.setState({submitBtnLoading:false})
					 	this.props.closeModal()
					 	this.handleReset()
					 	const data = {status:'0'}    //缺陷
						const {actions} = this.props
						return actions.fetchPostsIfNeeded(data)	

					 } 
					 else{
					 	messgae.error("暂存失败")
					 	
					 		
					 }
			}
		else{
			message.error("厂站不存在,请重新输入")
			this.props.form.resetFields(['stationID'])
			}			
	
		})
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
	}
	defaectUpliad(){  //缺陷录入上传
		return (<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
							<Button key="back" type="ghost" size="large"  onClick={this.handleReset.bind(this)}>重置</Button>
							<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">保存</Button>
							<Button type="primary" size="large" onClick={this.handleHolds.bind(this)}>暂存</Button>
						</div>
			)
	}
	operationsUpload(){ //运维数据上传
		return(
				<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
							<Button key="back" type="ghost" size="large"  onClick={this.handleReset.bind(this)}>重置</Button>
							<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">保存</Button>
							
				</div>
			)

	}
	render(){	
		const {FormData,listData,searchValue,data} = this.state
		const defect = this.defaectUpliad()
		const operations = this.operationsUpload()
		
		
		return(
				
				<Spin
					tip="加载中"
					spinning={this.props.isFetching}
					style={{width:"100%"}}
				>
					<Form className="flex flex-wrap" onSubmit={this.handleSubmit.bind(this)}>
						{FormData.map((item,i)=>this.renderFormItem(item,i))}
						{this.props.types ==10 ?  defect: operations}

					</Form>
				</Spin>

			)
		}
	}


const FromBar = Form.create()(CustomFromBar)
const mapStateToProps=state=>{
	const {station,GEtstation,department} = state
	const {isFetching, names} = station || {isFetching:ture,names:[]}
	return {
		isFetching,
		names,
		GEtstation,
		department

	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(FromBar)
