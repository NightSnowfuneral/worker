import React,{Component} from 'react'
import Modal from '../../../components/Modal'
import TableBar from '../../../components/TableBar'
import QueryConditions from '../../../components/QueryConditions'
import {Spin} from 'antd'
import * as actions from '../../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll,replaceData} from '../../../utils/config'
import DataTable from '../../../components/DataTable'
import './index.css'
class Query extends Component{
	
	constructor(props) {
				super(props);
				this.state={
					loading:false,
					request:true,
					type:80,
					data:[],
					types:true,
					newData:[],
					year:[],
					time:[],
					pageSize:30
					
					
				}
			}

	filterLists(lists,index){
		let newLists=[]
		// if(lists){
		//  	newLists=this.props.lists.filter((list)=>list.OrderState==index)
		//  }
		return newLists
	}
	componentDidMount() {
		this.getdata()
	}
	componentWillReceiveProps(nextProps) {
		
	}

	getdata(){
		const data = new Date()
		var nowMonth = data.getMonth() + 1
		const yeratr = data.getFullYear()
		const Time = yeratr + (nowMonth > 9 ? "-":"-0" ) + nowMonth
		const {actions} = this.props
		actions.DataName(Time) 
		this.TimeData(yeratr,nowMonth) 
		this.setState({
			newData: this.TimeData(yeratr,nowMonth)

		})
		
		
	}

	getYear(){
		const data = new Date()
		var nowMonth = data.getMonth() + 1
		const yeratr = data.getFullYear()
		const Time = yeratr + (nowMonth > 9 ? "-":"-0" ) + nowMonth
		const TimeYear = {Time:Time}
		return TimeYear

	}
	TimeData(year,month,Time){
	     const Data = new Date(year,month,0)
	     const monthData = Data.getDate()  //获取这个月份有多少天
	     const DataWeek = new Date(year,month-1)
	     let week = DataWeek.getDay()
	     if (week == 0) {
	       week = 7
	     }
	     const DataTime = {week:week,month:monthData}
	     return DataTime
     
  }
	GetLatestFaultWorkOrderList(data,time){
		
		this.setState({
			data,
			time

		})
	}
	effect(id){   //效果使用
		const {actions} = this.props
		actions.toggleTodo(id)
	}

	onChangeShift(data){
		const {actions} = this.props
		actions.DataName(data) 
	}
	tableData(){
		const pageId = "1"
		const Data =  
						<TableBar
									pageId={pageId}
									DataTitle={replaceData}
									dataSource={this.props.DataName.logs}
									pageSize={this.state.pageSize}
								/>
		return Data					
	}
	closeModal(){  //关闭弹窗
		const {actions} = this.props
		this.setState({
			showModal:false
		})
	}
	render(){
		
		const pageId = "1"
		const Query = true
		const {DataName} = this.props
	
		const {newData,data,time} = this.state
		

	
		return(
				<div className="fault flex flex-1 Query">
					<Spin 	
						tip="Loading..."
						style={{width:"100%"}}
						delay={100}
						spinning={this.state.loading}
						>

						<QueryConditions type={this.state.type} types={this.state.types} handler={this.GetLatestFaultWorkOrderList.bind(this)} >
						</QueryConditions>

						<Spin
							tip="loading...."
							style={{width:"100%"}}
							delay={100}
							spinning={DataName.isFetching && DataName.names.length===0}
						>
							<DataTable
									dataSource= {this.props.DataName.names} 
									Time={this.state.data.length !== 0 ? data : newData }   //本月星期与天数
 									onChange={this.effect.bind(this)}  //获取到ID
									onClickData="换班"  //按钮
									YearMonth={this.state.time.length !== 0 ?  this.state.time:  this.getYear()}
									onChangeShift = {this.onChangeShift.bind(this)}
								/>
						</Spin>
						<div className="replace">
							<div className="replace_title">
								{this.props.logs.length !== 0 ? "本月换班记录" : "" }
							</div>
							{this.props.logs.length !== 0 ? this.tableData() : "" }
						</div>
						
					</Spin>
				</div>
			)
	}
}

const mapStateToProps=state=>{
	const {DataName} = state 
	const {names,logs,isFechting} = DataName || {names:[],isFetching:true,logs:[]}
	return {
		DataName,
		names,
		logs,
		isFechting

	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(Query)