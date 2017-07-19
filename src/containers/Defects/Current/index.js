import React,{Component} from 'react'
import { withRouter } from 'react-router'
import TableBar from '../../../components/TableBar'
import QueryConditions from '../../../components/QueryConditions'
import {switchFormat,isSwitchFormat,DynamicTitleName} from '../../../api/Format'
import {Spin} from 'antd'
import * as actions from '../../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../../utils/config'

class Current extends Component{
	constructor(props) {
			super(props);
			this.state={
				loading:false,
				request:true,
				type:70,
				types:10,
				detasx:true,
				operation:20, //详情
				pageSize:20    //显示表单的行
			}
		}
	componentDidMount() {
		this.GetLatestFaultWorkOrderList()
	}
	
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	filterLists(lists,index){
		let newLists=[]
		
		newLists = this.props.names
		return newLists
	}
	
	async GetLatestFaultWorkOrderList(){
		const data = {status:'1'}
		const {actions} = this.props
		return actions.fetchPostsIfNeeded(data)	
	}
	render(){
		const pageId = "1"
		const Query = true
		const {isFetch, names} = this.props
		var {state} = this.props.location
		var ALLbtn = DynamicTitleName(state)
		return(
				<div className="fault flex flex-1 Query">
					<Spin 	
						tip="Loading..."
						style={{width:"100%"}}
						delay={100}
						spinning={this.state.loading}
						>	
						<TableBar
									dataSource={names ? names : []} 
									pageId={pageId}
									select={this.state.request}
									DataTitle={columnsAll}
									types={this.state.types}
									detasx={this.state.detasx}
									operation = {this.state.operation}
									pageSize={this.state.pageSize}
									addBtnPress = {ALLbtn}

								/>
					</Spin>
				</div>
			)
	}
}

const mapStateToProps=state=>{
	const {station} = state
	const { names,isFetching} = station || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Current))
