import React,{Component} from 'react'
import {Spin} from 'antd'
import * as actions from '../../actions'
import TableBar from '../../components/TableBar'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {switchFormat,isSwitchFormat,DynamicTitleName,addBtn} from '../../api/Format'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../utils/config'
import Post from '../../api/Post'
import Get from '../../api/Get'

const post = new Post()
const get=new Get()
class Operations extends Component{
	constructor(props) {
		super(props);
		this.state={
			name:[],
			type:true,
			types:20,
			operation:40, //删除加编辑
			pageSize:10

		}
	}
	componentDidMount(){
		this.GetLatestFaultWorkOrderList()
	}
	GetLatestFaultWorkOrderList(){
		const {actions} = this.props
        actions.journalData("")
			
	}
	render(){
		const pageId = "1"
		const {names} = this.props
		var title = "新增日志"
		var {state} = this.props.location
		var ALLbtn = DynamicTitleName(state,title)  //编辑与删除权限
		return(
				<div className="operations">
					<Spin
						spinning={false}
						tip="Loading..."
						style={{width:"100%"}}
						>
					  	<TableBar
								dataSource={this.props.names ? this.props.names : [] }
								pageId={pageId}

								type={this.state.type}
								types={this.state.types}
								addBtn={addBtn(state,title)}
								Rule={false}
								DataTitle={OperationaAll}
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
	const {journalData} = state
	const {names,isFetching} = journalData || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default  connect(mapStateToProps,mapDispatchToProps)(Operations) 