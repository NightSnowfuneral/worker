import React,{Component} from 'react'
import TableBar from '../../components/TableBar'
import QueryConditions from '../../components/QueryConditions'
import {Spin} from 'antd'
import * as actions from '../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Name} from '../../'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../utils/config'

class LogSearch extends Component{
	constructor(props) {
			super(props);
			this.state={
				loading:false,
				request:true,
				type:60,
				types:20,
				operation:20, //详情
				isFetching:true,
				pageSize:20


			}
		}
	componentDidMount() {
			this.GetLatestFaultWorkOrderList()
			this.Loading()
		}
	GetLatestFaultWorkOrderList(){
		const {actions} = this.props
        actions.journalSelect(0)
	}
	loadingChange(){
		 this.setState({ isFetching: false })	
	}
	Loading(){

		setInterval(()=>{
			this.loadingChange()
		},800)
		this.setState({ isFetching: true })	
	}
	render(){
		const pageId = "1"
		const {isFetching, names} = this.props
		
		return(
				<div className="fault flex flex-1 LogSearch">
				  	<Spin 	
						tip="Loading..."
						style={{width:"100%"}}
						delay={100}
						spinning={false}
						>

						<QueryConditions
							type={this.state.type}
							
						/>
						<Spin
							tip="loading...."
							style={{width:"100%"}}
							
							spinning={this.state.isFetching }
						>
								<TableBar
									dataSource={names} 
									pageId={pageId}
									select={this.state.request}
									type={this.state.type}
									types={this.state.types}
									DataTitle={OperationaAll}
									operation = {this.state.operation}
									pageSize={this.state.pageSize}
								/>
						</Spin>
					</Spin>
				</div>
			)
	}
}
const mapStateToProps=state=>{
	const {journalSelectData} = state
	const {names,isFetching} = journalSelectData || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default  connect(mapStateToProps,mapDispatchToProps)(LogSearch) 