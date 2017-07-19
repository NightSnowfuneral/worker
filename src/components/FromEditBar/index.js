import React,{Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {switchFormat,isSwitchFormat,CheckCharacter} from '../../api/Format'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import * as actions from '../../actions'
import moment from 'moment'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import {FromDataAll,BasicFormDataAdd,BasicFormDataArchive,detailsData,OperationaEDit,OperationaAdd,Parain,FromDataAllData,ParainData,BasicFormDataAddData,BasicFormDataArchiveData,OperationaEDitDetail} from '../../utils/config'
import './FromEditBar.css'
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
			shr:[],//处理人
			value:"",                           
			searchValue:'',
			listData:[],
			station:[],
			stationData:[],
			gdr:[],
			cahngzhan:true,
			titleID:{},
			department:[],
			organization:[],   //组织机构
			dutyData:[],//值班人员
			Data:{},
			NameData:[],
			ceshi:[],  //初始化数据
			itemValue:false,
			isFetching:false, //更新时需要
			StationType:true, //厂站不正确
			fetching:true
		}
		
	}
	componentDidMount() {    //赋值
		this.setCommonData() //获取数据赋值

		this.loading()
		this.setOrganization()
		this.addPeople()
		this.data(this.props.data)
		this.Props()
		this.handler()
		this.StateName()
		}
	
	StateName()
	{
		this.setState({
									StationType:true
								})
	}
	Props(){

		if (this.props.types ==20 ) {
			this.setState({
				NameData:this.props.data,
				isFetching:true
			})
		}
	}

	async setOrganization(){   //初始值部门打类
	this.setState({
		StationType:true 
	})
  	if(this.props.types == 20){
  		this.setState({
  			itemValue:false
  		})

	  		 const res= await get.organization()
	     this.setState({
	        organization: res.results
	     })
    
     
     
  
}
}
async addPeople(){
		const resData = await get.duty("9")  //请求值班人员
			
			if (resData.code == 200) {
			this.setState({
				    dutyData:resData.list
				})
			}
	} 
	componentWillReceiveProps(nextProps) {

		const districtAll = nextProps.names
		const loading = nextProps.loading
		const data = nextProps.data
		
		if (districtAll !== this.props.names ) {
			this.data(nextProps.data)
			this.Props()
			this.filterFormData(nextProps.data)
			this.setState({
  			itemValue:false,
  			fetching: true


  		})

			
			this.handler()
		}
		if (districtAll !== this.props.names) {  //重新熏染的时候把原来的数据清空
			this.handleReset()
		}
		
	}
	loading(){     //加载完成
		const data = {status:'0'}
		const {actions} = this.props
		actions.fetchPostsIfNeeded(data)	
	}	
	True(){

	}
	
	filterFormData(options){  //赋值
		
	

		
		switch(this.props.types) {
			case 10:
				
				break;
			case 20:
				this.journal(options)
				break;
		}
		
	}
	
	eventContent(options){   //日志事件类型数据分析
		switch(options.type) {
			case "未指定":
				return options.type = 0
				break;
			case "图形维护":
				return options.type = 1
				break;
			case "投运对点":
				return options.type = 2
				break;
			case  "巡视联调":
				return options.type = 3
				break;
			case "厂家运维":
				return options.type =4
				break;
		
		}

	}
	handover(options){  //是否交接数据处理
		switch(options.shift) {
			case "否":
				return options.shift = 0 
				break;
			case "是":
				return options.shift = 1
				break;
		}
	}
	lxbuim(item){
		let cm = new Number(item.onSiteOrgID)
		const cDm =cm.toString()
		
		return	item.onSiteOrgID = cDm
	}
	journal(options){ //日志
		
		
		const Data = options 
		
		this.lxbuim(Data)
	
		
		let arry = []
		if (this.props.types == 20 &&this.props.details == false) {
			OperationaEDit.map((item) =>{
			
			this.setFormDataValue(item,Data)
			
			arry.push(item)

		})
		}
		if (this.props.details == true) {
			OperationaEDitDetail.map((item) =>{
			this.setStateDisable(item)
			this.setFormDataValue(item,Data)
			
			arry.push(item)
			
		})
	}

		this.setState({
			FormData:arry,
			
		})
	}
	setSelectPeople(item,options){  //名称
		
		if (item.dataIndex == "createUserName" || item.dataIndex == "SendSingle" || item.dataIndex== "SendSingleData" || item.dataIndex=="SendSingleDataNASm") {
			item.value = options.flows

		}

	}
	setStateDisable(item){
		item.disabled = true
	}
	
	setSelectTypeValueSubmit(item,options){   //归档人
		if (item.dataIndex == 'submitUserIDs' ) {

			if (item.options.length == 0 && options.nextFlow) {
					options.nextFlow.list.map((list) => {
						item.options.push({...list, name:list.label,value:list.value })
				})
			}
		}
	}
	setSelectTypeValyeQxlxValue(items,options){
		let cm = false
		if (items.dataIndex =='submitUserIDs' && options.flows) {
			options.flows.map((item,i)=>{
					if (item.title == items.title ) {
						items.value = item.userID 
						cm = true
					
					}
					
			})
			if (cm == false) {
				items.value =""
			}
			
		}
		
	}
	setSelectTypeValueStation(item,options){
		if (item.dataIndex == 'stationID') {
			
		
			item.station.id = options ? options.id.toString() : ""
			item.station.name = options ? options.name : ""
			
			
			
			

		}

		
		
	}
	
	setFormDataValue(item,options){   //分配标题
		for (let value in options) {
				if (item.dataIndex == value &&  options[value] !== null) {
					item.value = options[value]		
				}

			}
		}
	setSelectTypeValueQxdj(item,data){    //缺陷等级
		if (item.dataIndex == 'qxdj') {
			if (item.options.length == 0 ) {
					this.state.qxdj.map((list) => {
						item.options.push({...list, name:list.label,value:list.value })
				})
			}
		}
	}
	setSelectTypeValueQxlx(item,data){    //缺陷类型
		if (item.dataIndex == 'qxlx') {
			if (item.options.length == 0) {
				this.state.qxlx.map((list) => {
					item.options.push({...list, name:list.label,value:list.value})
				})
			}
		}
	}
	setSelectTypeValueUser(item,data){   //处理人
		if (item.dataIndex == 'handleUserID') {
			if (item.options.length == 0) {
				this.state.shr.map((list) => {
					item.options.push({...list,name:list.label,value:list.value})
				})
			}
		}
	}

	async setCommonData(){
		var Common = await get.commonData()  //启动获取数据的函数
		if (Common.code == 200) {
			this.setState({
				data:Common,
				qxdj:Common.qxdj,
				qxlx:Common.qxlx,
				gdr:Common.gdr,
				shr:Common.nextFlow.list,  //消缺人
				titleID:Common.nextFlow.titleID  //是不是消缺人
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
			listData:json.list,
			cahngzhan:false
		})
	}

	
	}
	async data(dataCourse){
		if (this.props.types == 20) {
			const id = dataCourse.onSiteOrgID
			const res = await get.department(id)
			this.setState({
				department:res.users
			})	

		}
		
	}
	async hendleChangePeople(value){ //获取组织机构
		const id = value[1] ? value[1] : value[0]
		
		this.props.form.resetFields(['ContactPersonnel'])
		
		const res = await get.department(id)
		
		if (res.code == 200) {
			this.setState({
				department:res.users,
				itemValue:true
			})	
		}
		
	}
	DataNamePeople(am){ //人员
		const data = []
		for (var i = 0; i < am.length; i++) {
			const adc = am[i].value
			data.push(adc)
		}
		
		return data
		
		
	}

	PeopleDta(data){  //名称处理
		
		let dataName= null
		if (data.value) {

			data.value.map((item,i)=>{
				
				if (item.title === data.title) {
					dataName = item.userName	
				}
				
				
				
			
		})
		}

		return dataName ? dataName : ""
		
	}
	ContactPersonnelData(am){
		const data = []
		for (var i = 0; i < am.length; i++) {
			const adc = am[i].value
			data.push(adc)
		}
		if (this.state.itemValue) {
			return []
		}
		else{
			return data
		}
	}
	departmentValue(value){    //所属部们进行处理
		let data = []
		this.state.organization.map((item,i)=>{
			if (item.value == value) {
				data.push(item.value)
			}
			if (item.value !== value && item.children !== null) {
				item.children.map((items,i)=>{
					if (items.value == value) {
						data.push(item.value,items.value)
					}
				})
			}
		})
		
		
		return data
	}

	Station(item){
		if (this.state.StationType   ) {
			return item.name
		}
		else
		{
			return 
		}
		
	}
	checkPrice(rule, value, callback){
    if (CheckCharacter(value)) {
      callback('您输入的有特殊字符!');
      return;
    }
    callback()
  }
	formClassiFication(item){  //根据表单的不同分配不同的样式  或输入 或下拉
		
		const {getFieldDecorator} = this.props.form
		const {data,listData,qxdj,shr,qxlx,station,dutyData} = this.state	
		
		
		switch(item.type) {
			case 'Foundpeople': //填报人
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:this.PeopleDta(item),
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled}  autocomplete="off" />
							)
						)
				break
			case 'FoundpeopleTwo': 
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:this.DataNamePeople(item.value),
							rules:[{required: item.require, message:"请选择"+item.title
							}]
						})(
						<Select 
									disabled={item.disabled}
									mode= {this.props.types == 40 ? "" : "multiple"}
								>
							{dutyData.map((item,i)=>{
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
			case'statusid':        //缺陷状态
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled}  autocomplete="off" />
							)
						)
				break
			case 'FoundDepartments': //填报部门
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled} autocomplete="off" />
							)
						)
				break	
			case 'textareaFound':                                                                     //缺陷情况
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							rules: [{ validator: this.checkPrice.bind(this) }],
							
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
							initialValue:item.station ? this.Station(item.station) : "",   //厂站进行判断
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
										<Option key={item.id} value={item.id}>
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
							initialValue:item.value == 0 ? "" : item.value  ,
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
			case 'selectType':             //缺陷类型
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value ==  0 ? "" : item.value ,
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
								
							</Select>
						)

					)
				break
			case 'selectPeople':               //处理人
				return( 
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value ==0 ?  "" : item.value,
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
			case 'SubmitPeople':               //处理人
				return( 
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value ==0 ?  "" : item.value,
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
			case 'DataPicker':              //时间
				return( 
						getFieldDecorator(item.dataIndex,{
							initialValue:moment(item.value,"YYYY/MM/DD HH:mm:ss"),
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
				
				break;
			case 'department':  //所属部门

              return(
                  getFieldDecorator(item.dataIndex,{
                          initialValue:this.departmentValue(item.value),
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
            case'ContactPersonnel':   //联系人员
				return(
						getFieldDecorator(item.dataIndex,{
								initialValue:this.ContactPersonnelData(item.value),
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


		
		}
	}
	filter(){	//提交更新

		const data = {status:'0'}    //缺陷
		const {actions} = this.props
		return actions.fetchPostsIfNeeded(data)	
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
	}

	NameData(){
		let data =[]
		
		for (var i = 0; i < this.props.data.onSiteData.length; i++) {
			const cm = this.props.data.onSiteData[i].value
			data.push(cm)
		}
		
		return data
		
	}
	handleNameData(){
		this.setState({
			fetching:false
		})
	}
	handler(){
		setTimeout(()=>{
			this.handleNameData()
		},600)
	}
	handleSubmit(e){             //提交表单的概念
		e.preventDefault()
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			let newImage = []
			const dataValue = {}
			if (!err) {
				
				dataValue.type = value.typeData  //事件类型
				dataValue.record = value.record //事件内容
				dataValue.comment = value.comment //备注
				dataValue.shift =value.shiftData //是否交接
				dataValue.time = value.time.format('YYYY-MM-DD HH:mm:ss')
				dataValue.onSite = value.onSiteData
				dataValue.day = value.dayData //白班
				dataValue.night = value.nightData  //晚班
				
			
				const res = await post.shift_recordData(dataValue,this.state.NameData.id)
				if (res.code == 200) {
				 	message.success("日志提交成功")
				 	this.setState({submitBtnLoading:false})
				 	this.props.closeModal()
				 	const {actions} = this.props
              		actions.journalData("")
              		this.handleReset()
				 } 
				 else{
				 	message.error("日志提交失败")
				}
				}
			
		
	
			
	
		})

	}

	determineBtn(){    //点击
		this.setState({submitBtnLoading:false})
		this.props.closeModal()
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
	}
	
	uploadShift(){
		return(
			<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
				<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">提交</Button>
				
			</div>
			)
	}
	determine(){
		return(
			<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
				<Button type="primary" size="large" onClick={this.determineBtn.bind(this)}>确定</Button>

			</div>
			)
	}

	eliminating(){
		return(
				<div className="antd-modal-footer" style={{width:'100%',marginTop:"18px",textAlign:'left'}}>
					<Button>消缺策略</Button>
				</div>
			)
	}

	render(){	
		const {FormData,listData,searchValue,data} = this.state
		
		const determine =  this.determine()
		

		 
		const eliminating = this.eliminating()	
		
		
		return(
				
				<Spin
					tip="加载中"
					spinning={this.state.fetching}
					style={{width:"100%"}}
					delay = {100}

				>
					<Form className="flex flex-wrap" onSubmit={this.handleSubmit.bind(this)}>
						{FormData.map((item,i)=>this.renderFormItem(item,i))}
						{
							this.props.types == 10   ?  (this.props.statusID ==10 ? "" :eliminating) : ""
						}
						{
							this.props.details  ? determine : ""
						}	
						{ this.props.types == 20 &&  this.props.details ==false  ? this.uploadShift() : ""}
					
					
					</Form>
				</Spin>

			)
		}
	}


const FromBar = Form.create()(CustomFromBar)
const mapStateToProps=state=>{
	const {journalData,Laway} = state
	const {names,isFetching} = journalData || {names:[],isFetching:true}
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
