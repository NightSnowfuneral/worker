import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin} from "antd"
import * as actions from '../../../actions'
import TableBar from '../../../components/TableBar'
import {FaultNavigationArr} from '../../../utils/config'
import {switchFormat,isSwitchFormat,DynamicTitleName,addBtn} from '../../../api/Format'
import Post from '../../../api/Post'
import Get from '../../../api/Get'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../../utils/config'

const post = new Post()
const get=new Get()
class Fault extends Component{
	constructor(props) {
		super(props);
		this.state={
			pageId:'1',
			names:[],
			types:10,
			detasx:false,
			operation:40,  //删除操作
			height:'10%',
			pageSize:10
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
		const data = {status:'0'}
		const {actions} = this.props
		return actions.fetchPostsIfNeeded(data)	
	}
	
	render(){
		
		const {pageId} = this.state
		const title = "新增缺陷工单"
		const {isFetching, names} = this.props
		var {state} = this.props.location
	
		var ALLbtn = DynamicTitleName(state,title)  //编辑与删除权限
		
		return (
			<div className="fault flex flex-1 management">
				<Spin 
					spinning={false}
					tip="Loading..."
					style={{width:"100%"}}
					>
						<TableBar
							dataSource={this.props.names ? this.props.names : []} 
							pageId={pageId}
							types={this.state.types}
							addBtn={addBtn(state,title)}
							addBtnPress = {ALLbtn}
							DataTitle={columnsAll}
							detasx={this.state.detasx}
							operation = {this.state.operation}
							height={this.state.height}
							pageSize={this.state.pageSize}
							
						/>
				</Spin>
			</div>
		)
	}
}
const mapStateToProps=state=>{
	const {station,AllPressmisonm} = state
	const { names,isFetching} = station || {names:[],isFetching:true}

	return {
		isFetching,
		names,
		AllPressmisonm
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Fault))
