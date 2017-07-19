
import React,{Component} from 'react'
import {Spin,Button} from 'antd'
import Modal from '../../components/Modal'
import Post from '../../api/Post'
import Get from '../../api/Get'
import TableBar from '../../components/TableBar'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {switchFormat,isSwitchFormat,DynamicTitleName,addBtn} from '../../api/Format'
import * as actions from '../../actions'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll,ruleDataSelect,assignmentData} from '../../utils/config'
const post = new Post()
const get=new Get()
class PersonnelScheduling extends Component{
	
	constructor(props) {
		super(props);
		this.state={
			
			request:false,
			showModal:false,
			Rule:true,
			names:[],
			types:40,
			role:true,
			type:true,
			operation:50
		}
	}
	componentDidMount(){
		this.GetLatestFaultWorkOrderList()
	}
	 GetLatestFaultWorkOrderList(){   //请求规则
		const {actions} = this.props
		actions.RulePeole()
		
		
		
	}
	
	
	render(){
		 const {showModal,request} = this.state
		 const {isFetching,names} = this.props
		 const pageId = "1"
		const title = "规则分配"
		var {state} = this.props.location
		
		var ALLbtn = DynamicTitleName(state,title)
		
		return(
				<div className="regulation fault flex flex-1">
					<Spin
							spinning={isFetching && names.length===0}
							tip="Loading..."
							style={{width:"100%"}}
						>
						
						<TableBar
							dataSource={this.props.names ? this.props.names : []} 
							pageId={pageId}
							addBtn={addBtn(state,title)}
							addBtnPress = {ALLbtn}
							Rule={this.state.Rule}
							
							types = {this.state.types}
							DataTitle={assignmentData}
							role={this.state.role}
							operation={this.state.operation}


						/>
						
					</Spin>
				</div>
			)
		}
	
}
const mapStateToProps=state=>{
	const {rulePeo} = state
	const { names,isFetching} = rulePeo || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PersonnelScheduling))
