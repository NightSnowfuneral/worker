import React,{Component} from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
import Get from '../../api/Get'
import Post from '../../api/Post'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './index.css'
import * as actions from '../../actions'
import {BasicFormDataAddTo,OperationaAdd,assignment,TableData} from '../../utils/config'
import Modal from '../Modal'



const post = new Post()
const get = new Get()
var dataInput = []


class TableBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			dataSource:[],
			Time:[],
			showModal:false,
			modalWidth:"",
			modalTitle:"",
			DataTypes:80,  //换班
			DataTitle:''


		}
	}
	componentDidMount() 
		
	 {  //componentWillMount会在组件render之前执行，并且永远都只执行一次
		
		this.setDataSource(this.props.dataSource)
		this.setTime(this.props.Time)
		
	}
	componentWillReceiveProps(nextProps) {   //二次更新的时候 不加这个则为空
		const districtAllState=nextProps.dataSource 
		if(nextProps.dataSource.length !==0 || districtAllState ){
	      this.setDataSource(nextProps.dataSource)
	      this.setTime(nextProps.Time)
	    }
	    else{
	    	this.setState({
	    		dataSource:[]
	    	})
	    }
	    if (districtAllState !== this.props.dataSource) {
	    	dataInput = []
	    }
	}
	setDataSource(dataSource){     //表单数据给state
		
		this.setState({
			dataSource
		})
	}
	setTime(Time){  //时间
		this.setState({
			Time
		})
	}

	add(){   //获取日期数据
		const daysArr = []; // 6*7的日历数组
	    const {Time} = this.state
		let currentWeekday = Time.week   //星期几
		const currentMonthDays = Time.month  //这个月有多少天
	   
	   	for ( var i = 0; i < currentMonthDays; i++) {
	   		daysArr[i] = {title:i+1,dataIndex:i, width:50, key:i,index:1 }
	   	}
		return daysArr
	    
	}
	thead(){   //表头
		const daysArr = this.add()
		const TableDataName = TableData.concat(daysArr)
		
		const cmd = <tr>{TableDataName.map((item,i) =>(
				 <th rowSpan = {item.index}>{item.title}</th>
				))}
			</tr>
		
		return cmd
	}

	cmad(){   //获取星期
		const daysArr = []
		const {Time} = this.state
		let currentWeekday = Time.week -1  //星期几
		const currentMonthDays = Time.month  //这个月有多少天
		
		daysArr[0] = {title:currentWeekday,dataIndex:0,width:50,key:0}
		for (var i = 0; i < currentMonthDays; i++) {
			currentWeekday += 1
			if (currentWeekday > 7) {
				currentWeekday = 1
			}
			daysArr[i] = {title:currentWeekday,dataIndex:i, width:50, key:i }
		}
		return this.weekday(daysArr)
		
	}
	weekday(daysArr){  //星期处理
		daysArr.map((item,i) =>(
				this.weekapi(item)
			))
		const cmd = <tr>{daysArr.map((item,i) =>(
				 <th   rowSpan = {item.index}>{item.title}</th>
				))}
				</tr>
		return cmd
		
	}
	weekapi(item){
		switch(item.title) {
			case 1:
				item.title = "一"
				break;
			case 2:
				item.title = "二"
				break;
			case 3:
				item.title = "三"
				break;
			case 4:
				item.title = "四"
				break;
			case 5:
				item.title = "五"
				break;
			case 6:
				item.title = "六"
				break;
			case 7:
				item.title = "七"
				break;
		}
	}
	DataTrTd(){   //td输出
		const {dataSource} = this.state
		const cm = dataSource.map((item,i)=>(
				<tr>
					<td>{i+1}</td>
					<td>{item.name}</td>
					{this.idThis(item.schedule,item.userID)}
				</tr>
			))
		return cm
		 
		
	}
	idThis(schedule,userID){ //数据渲染到页面
		const cmd = schedule.map((item,i)=>(
				<td key={i} className={classnames('hover',{active:item.component})} onClick={this.handleChange.bind(this,item.id,item.component,item.value,userID,item.title)}>{item.title}</td>
			))
		return cmd
	}


	shift(data, id){    //换班数据处理
		
		for (var i = 0; i < dataInput.length; i++) {
					if (dataInput[i].id == id){
						dataInput.splice(i,1)
						this.props.onChange(id)
						return
					}
			
				}
		if (dataInput.length > 1) {
			message.success("不能超过2个一样")
				return 
		}
		if (data.fromType == "") {
				message.success("值为空")
				return 
		}
		for (var i = 0; i < dataInput.length; i++) {
			if (dataInput[i].fromType == data.fromType) {
				message.success("换班的值一样")
				return 
			}
		}
	
		
		this.props.onChange(id)
		dataInput.push(data)	
	}
	handleChange(id,compoentn,value,userID,title){  //点击改变他的状态
		
		
		const TimeYear = this.props.YearMonth.Time + (value > 9 ? "-":"-0") + value
		const data = {id:id,fromUser:userID,fromDate:TimeYear,fromType:title}

		this.shift(data, id)
		
		
	}
	showModal(){                //页面添加
		const {actions} = this.props
		this.setState({
			showModal:true
		})
	}
	huangban(){
		this.showModal() 
		this.setState({
			modalWidth:"300",request:true,modalTitle:"提示",DataTitle:'换班'
		})
	}
	async Dataupload(){  //开始把数据传给后台
		const arr = []
		const dataOne = {}
		const {YearMonth} = this.props
		const TimerYer  = YearMonth.Time
 		dataInput.map((item,i)=>{
 			
 			if (i == 0) {
 				dataOne.fromUser = item.fromUser
 				dataOne.fromDate = item.fromDate
 				dataOne.fromType = item.fromType
 				
 			}
 			else{
 				dataOne.toUser = item.fromUser
 				dataOne.toDate = item.fromDate
 				dataOne.toType = item.fromType
 				
 			}

			   
		})
		
		const res = await post.scheduleSwitch(dataOne)
		
		if (res.code == 200 ) {
			this.props.onChangeShift(TimerYer)
			dataInput=[]
			message.success("换班成功")
		}
		else{
			dataInput=[]
			message.success("换班失败")
			this.props.onChangeShift(TimerYer)

		}
		
	
 			

	}	
	closeModal(){  //关闭弹窗
		const {actions} = this.props
		this.setState({
			showModal:false
		})
	}
	render(){
		
	    
		const {showModal,DataTypes,modalWidth,modalTitle,DataTitle} = this.state
		return(
			<div className="DataTable">
				<table id="tab">
					<thead className="ant-table-theadData">
						{this.thead()}
						{this.cmad()}
					</thead>
					<tbody className="ant-table-tbodyData">
						{this.DataTrTd()}
					</tbody>
					
				</table>
				<div className="antd-modal-footer" style={{width:"100%", marginTop:"10px",textAlign:'right'}}>
						<Button type="primary" disabled={dataInput.length == 2 ? false : true} onClick={this.huangban.bind(this)}>
							{this.props.onClickData}
						</Button>
				</div>
				<Modal
						modalWidth={modalWidth}					
						visible={showModal}
						DataTypes = {DataTypes}
						closeModal={this.closeModal.bind(this)}
						DatauploadName = {this.Dataupload.bind(this)}
						modalTitle={modalTitle}
						DataTitle={DataTitle}

				/>

			</div>
		)
	}
}



export default TableBar 