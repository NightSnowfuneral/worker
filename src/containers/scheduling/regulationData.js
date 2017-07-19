import React,{Component} from 'react'
import {Spin,Button} from 'antd'
import Modal from '../../components/Modal'
import Post from '../../api/Post'
import Get from '../../api/Get'
import TableBar from '../../components/TableBar'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll,ruleDataSelect} from '../../utils/config'
import {switchFormat,isSwitchFormat,DynamicTitleName,addBtn} from '../../api/Format'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actions from '../../actions'
const post = new Post()
const get=new Get()
class regulation extends Component{
	constructor(props) {
		super(props);
		this.state={
			
			request:false,
			showModal:false,
			Rule:true,
			names:[],
			type:true,
			types:30,
			operation:50
		}
	}
	componentDidMount(){
		this.GetLatestFaultWorkOrderList()
	}
	 GetLatestFaultWorkOrderList(){   //请求规则
		
		const {actions} = this.props
		actions.RuleData()
	}
	
	
	render(){
		 const {modalWidth,modalTitle,showModal,request} = this.state
		 const pageId = "1"
		const title = "新增规则"
		var {state} = this.props.location
		
		var ALLbtn = DynamicTitleName(state,title)
		return(
				<div className="regulation fault flex flex-1">
					<Spin
							spinning={false}
							tip="Loading..."
							style={{width:"100%"}}
						>
						
						<TableBar
							dataSource={this.props.names} 
							pageId={pageId}
							
							Rule={this.state.Rule}
							type = {this.state.type}
							addBtn={addBtn(state,title)}
							addBtnPress = {ALLbtn}
							types = {this.state.types}
							DataTitle={ruleDataSelect}
							operation={this.state.operation}

						/>
						
					</Spin>
				</div>
			)
		}
	
}

const mapStateToProps=state=>{
	const {ruleData} = state
	const { names,isFetching} = ruleData || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(regulation))