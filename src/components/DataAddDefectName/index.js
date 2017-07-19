import React,{Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {switchFormat,isSwitchFormat,CheckCharacter} from '../../api/Format'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import * as actions from '../../actions'
import moment from 'moment'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import {FromDataAllCeshi,ParainCeshi,FromDataAllmiaoshu,FromDataAllmiaoshuData,FromDataAllCeshiGuidang} from '../../utils/config'
import './index.css'
import Get from '../../api/Get'
import Post from '../../api/Post'



var pattern = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\(\)\（\）\!\！\,\.\?\[\]\{\}\ \。\-\_\+\=\“\”\"\"\'\'\‘\'\n\r\s\，\;\；\·\、\.]/g 
const FormItem = Form.Item
const Option = Select.Option
const {RangePicker} = DatePicker

const post = new Post()
const get = new Get()
class CustomFromBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			
			submitBtnLoading:false,
			data:[],//所有初数据
			qxdj:[],//缺陷等级
			qxlx:[], //缺陷类型
			shr:[],//处理人
			FormData:[],//表单标题
			TableName:[],
			miaoshu:[],
			FromDataName:[], //基础数据			
			listData:[],
			cahngzhan:true,                         
			searchValue:'',
			listData:[],
			station:[],
			stationData:[],
			itemValue:false,
			isFetching:false, //更新时需要
			StationType:true, //厂站不正确
			loading:false,
			fetching:true
		}
		
	}
	componentDidMount() {    //赋值
		
		this.setCommonData()
		this.handler()
		}
	componentWillReceiveProps(nextProps) {
		const districtAll = nextProps.names
		if (districtAll !== this.props.names && districtAll !== undefined ) {
			this.setState({
			FormData:this.handlerName(districtAll),
			listData:[],
			cahngzhan:true,
			StationType:true,
			listData:[],
			itemValue:false,
			fetching:true
			})
			this.handler()
			this.FromData(districtAll)
			this.handleReset()
			

		}
		if (districtAll == undefined) {
			this.setState({
			FormData:[],
			FromDataName:[],
			miaoshu:[]
			})

			this.handleReset()

		}
	}
	handlerName(districtAll){
		if (districtAll.flows) {
			return districtAll.flows
		}
		else{
			return []
		}
	}
	FromData(options){  //初始值赋值
		let arry = []
		let miaoshuData = []
		const optionsID = options.station
		if (this.props.statusID == 10 || this.props.statusID == 60 || this.props.statusID == 20 ) {
			FromDataAllCeshi.map((item,i)=>{
				this.setStateDisable(item)
				this.setSelectTypeValueSubmit(item,options)
				this.setSelectTypeValyeQxlxValue(item,options)
				this.setSelectTypeValueQxdj(item,options)//缺陷等级
				this.setSelectTypeValueQxlx(item,options)//缺陷类型
				this.setSelectTypeValueStation(item,optionsID) //厂站初始化
				this.setFormDataValue(item,options)
				this.sectNameGuidang(item,options) //归档特殊
				arry.push(item)
			})
		}
		if (this.props.statusID == 10) {
			FromDataAllmiaoshu.map((item,i)=>{
				this.setStateDisable(item)
				this.setFormDataValue(item,options)
				miaoshuData.push(item)
			})
		}
		if (this.props.statusID !== 10) {
				FromDataAllmiaoshuData.map((item,i)=>{
					this.setStateDisable(item)
					this.setFormDataValue(item,options)
					miaoshuData.push(item)
				})
			}
		if (this.props.statusID == 40) {
				FromDataAllCeshiGuidang.map((item,i)=>{
					this.setStateDisable(item)
					this.setSelectTypeValueSubmit(item,options)
					this.setSelectTypeValyeQxlxValue(item,options)
					this.setSelectTypeValueQxdj(item,options)//缺陷等级
					this.setSelectTypeValueQxlx(item,options)//缺陷类型
					this.setSelectTypeValueStation(item,optionsID) //厂站初始化
					this.setFormDataValue(item,options)
					this.sectNameGuidang(item,options) //归档特殊

					arry.push(item)
				})
			}	


		

		
		this.setState({FromDataName:arry,miaoshu:miaoshuData})
	}
	setStateDisable(item){
		if (this.props.details && item.dataIndex !== 'status') {
			item.disabled = true
		}
		if (this.props.details == false &&  item.dataIndex !== 'status') {
			item.disabled = false
		}

		
	}
	sectNameGuidang(item){
		if (item.dataIndex == 'submitUserIDs' ) {
			switch(this.props.statusID) {
				case 40:
					item.type = "归档"
					break;
				default:
					item.type = "selectPeople"
			}
		}
	}
	setSelectTypeValueStation(item,options){ //厂站
		if (item.dataIndex == 'stationID') {
			
		
			item.station.id = options ? options.id.toString() : ""
			item.station.name = options ? options.name : ""
			
			
			
			

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
	setFormDataValue(item,options){   //分配标题
		for (let value in options) {
				if (item.dataIndex == value &&  options[value] !== null) {
					item.value = options[value]		
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
	setSelectTypeValueSubmit(item,options){   //归档人
		if (item.dataIndex == 'submitUserIDs' ) {

			if (item.options.length == 0 && options.nextFlow) {
					options.nextFlow.list.map((list) => {
						item.options.push({...list, name:list.label,value:list.value })
				})
			}
			switch(this.props.statusID) {
				case 10:
					item.title = "派单人"
					break;
				case 60:
					item.title = "消缺人"
					break;
				case 20:
					item.title = "归档人"
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
	filter(){	//提交更新

		const data = {status:'0'}    //缺陷
		const {actions} = this.props
		return actions.fetchPostsIfNeeded(data)	
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
	}
	handleSubmit(e){             //提交表单的概念
		e.preventDefault()
		
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			let newImage = []
			const dataValue = {}
			if (!err) {
				
					dataValue.id = this.props.names ? this.props.names.id : "" //工单id
					dataValue.images = newImage  //图片
					dataValue.qxdj = value.qxdj ? value.qxdj : 0//缺陷等级
					dataValue.description = value.description //缺陷描述
					dataValue.stationID = this.state.cahngzhan ? this.props.names.station.id.toString() : (value.stationID == 0 ? "" :value.stationID.toString()) //厂站ID
					dataValue.geoX ="0"  //厂站经度
					dataValue.geoY ="0"  //厂站维度
					dataValue.qxlx = value.qxlx ? value.qxlx : 0//缺陷类型 //缺陷类型
					dataValue.status = '1' //暂存
					dataValue.nextFlowUserID = value.submitUserIDs ? value.submitUserIDs : 0//审核人ID
					dataValue.nextFlowTitleID = this.props.names ? this.props.names.nextFlow.titleID : ""
					dataValue.statusid = this.props.statusID
					if (this.props.names.status !== "填报中") {
						dataValue.content = value.content ? value.content  : ""
					}
					if (pattern.test(dataValue.description)) {   //判断特殊字符
							message.success("具有特殊字符请重新输入")
							return
					}
					if (pattern.test(dataValue.content)) {   //判断特殊字符
						message.success("具有特殊字符请重新输入")
							return
					}
					var str = dataValue.stationID
					var n = Number(str)
					if (isNaN(n) && dataValue.stationID.length !== 10 || dataValue.stationID.length !== 10) {   //判断厂站
						message.error("厂站不存在,请重新输入")
						this.props.form.resetFields(['stationID'])
						this.setState({
										StationType:false
							})
						return
					}
					
					const res = await post.dispose(dataValue)
							if (res.code == 200) {
									message.success("缺陷提交成功")
									this.setState({submitBtnLoading:false,fetching:true})
									this.props.closeModal()
									 this.filter()
									this.handleReset()					
								 } 
						 else{
								message.error("缺陷提交失败")
						}
			}

		})
			

	}
	handleHolds(e){   //暂存的概念
		e.preventDefault()
		this.props.form.validateFieldsAndScroll( async (err, value) => {
			let newImage = []
			const dataValue = {}

			dataValue.id = this.props.names ? this.props.names.id : "" //工单id
					dataValue.images = newImage  //图片
					dataValue.qxdj = value.qxdj ? value.qxdj : 0//缺陷等级
					dataValue.description = value.description //缺陷描述
					dataValue.stationID = this.state.cahngzhan ? (this.props.names.station.id ==0 ? "":this.props.names.station.id.toString()) : (value.stationID == 0 || value.stationID == undefined ? "" :value.stationID.toString()) //厂站ID
					dataValue.geoX ="0"  //厂站经度
					dataValue.geoY ="0"  //厂站维度
					dataValue.qxlx = value.qxlx ? value.qxlx : 0//缺陷类型 //缺陷类型
					dataValue.status = '0' //暂存
					dataValue.nextFlowUserID = value.submitUserIDs ? value.submitUserIDs : 0//审核人ID
					dataValue.nextFlowTitleID = this.props.names ? this.props.names.nextFlow.titleID : ""
					dataValue.statusid = this.props.statusID
					
					if (this.props.names.status !== "填报中") {
						dataValue.content = value.content ? value.content  : ""
					}
			if(CheckCharacter(dataValue.description) || CheckCharacter(dataValue.content)){
				message.error("输入框有特殊字符不能暂存")
				return
			}
			var str = dataValue.stationID
			var n = Number(str)
			if ((!isNaN(n) &&dataValue.stationID.length === 10) || dataValue.stationID == "" ) {
				
					const res = await post.dispose(dataValue)
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
		this.setState({
										StationType:false
							})

			}
			})
		}	
	formClassiFication(item){  //根据表单的不同分配不同的样式  或输入 或下拉 人名
		const {getFieldDecorator} = this.props.form
		
		
		
		
				return(
							getFieldDecorator(item.time,{
								initialValue:item.userName + "       "+item.time,
								rules:[{ require:true, message: '请输入' + item.title}]
							})(
								<Input disabled={true}   autocomplete="off"/>
							)
						)
		
	}
	checkPrice(rule, value, callback){  //字符处理
    if (CheckCharacter(value)) {
      callback('您输入的有特殊字符!');
      return;
    }
    callback()
  }
	formClassiFicationData(item){
		const {getFieldDecorator} = this.props.form
		const {listData} = this.state
		switch(item.type) {
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
			case'statusid':        //缺陷状态
				return(
							getFieldDecorator(item.dataIndex,{
								initialValue:item.value,
								rules:[{ require: item.require, message: '请输入' + item.title}]
							})(
								<Input disabled={item.disabled}  />
							)
						)
				break
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
			case 'textareaFound':                                                                     //缺陷情况
				return(
						getFieldDecorator(item.dataIndex,{
							initialValue:item.value,
							 rules: [{ validator: this.checkPrice.bind(this) }],
						})(
							<Input disabled={item.disabled}
								type="textarea"
								autosize={{minRows:2, maxRows:6}}
							/>
						)
					)
				break;

			}
	}
	renderFormItem(item, i, index){   //全部的from表单外表
		let formItem=<FormItem
						key={item.dataIndex}
						className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
						label={item.title}
					>
						 {index == 20 ? this.formClassiFication(item) : this.formClassiFicationData(item)}
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
	Station(item){
		if (this.state.StationType) {
			return item.name
		}
		else
		{
			return 
		}
	}
	determineBtn(){    //点击
		this.setState({submitBtnLoading:false})
		this.props.closeModal()
	}
	handleReset(){   //数据重置
		this.props.form.resetFields()
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
	upload(){
		return(
			<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
				<Button className="baocun" key="submit" type="primary" htmlType="submit" size="large">提交</Button>
				<Button type="primary" size="large" onClick={this.handleHolds.bind(this)}>暂存</Button> 
			</div>
			)
	}
	determineBtn(){    //点击
		this.setState({submitBtnLoading:false})
		this.props.closeModal()
	}
	determine(){
		return(
			<div className="antd-modal-footer" style={{width:"100%", marginTop:"18px",textAlign:'right'}}>
				<Button type="primary" size="large" onClick={this.determineBtn.bind(this)}>确定</Button>

			</div>
			)
	}

	render(){	
		
		const {FormData,FromDataName,miaoshu} = this.state
		
		return(
				
				<Spin
					tip="加载中"
					spinning={this.state.fetching}
					style={{width:"100%"}}
					delay = {100}

				>
					<Form className="flex flex-wrap" onSubmit={this.handleSubmit.bind(this)}>
						{FormData.map((item,i)=>this.renderFormItem(item,i,20))}
						<div className="row-1" style={{padding:'2px 8px',marginTop:'12px'}}>
							{this.props.names == undefined ? "" : ""}
						</div>
						{FromDataName.map((item,i)=>this.renderFormItem(item,i,30))}
						<div className="row-1" style={{padding:'2px 8px',marginTop:'12px'}}>
							{this.props.names == undefined ? "" : ""}
						</div>
						{miaoshu.map((item,i)=>this.renderFormItem(item,i,30))}
						
						{ this.props.details ? this.determine() :this.upload()}
						
						
					
					</Form>
				</Spin>

			)
		}
	}


const FromBar = Form.create()(CustomFromBar)
const mapStateToProps=state=>{
	const {station,GEtstation,TypesDetail,loading} = state

	const {isFetching, names} = TypesDetail || {isFetching:ture,names:[]}
	return {
		isFetching,
		names,
		GEtstation,
		loading

	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(FromBar)
