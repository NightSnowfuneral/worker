import React,{Component} from 'react'

import TableBar from '../../../components/TableBar'
import QueryConditions from '../../../components/QueryConditions'
import {Spin} from 'antd'
import {switchFormat,isSwitchFormat,DynamicTitleName} from '../../../api/Format'
import * as actions from '../../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../../utils/config'
class Query extends Component{

	filterLists(lists,index){
		let newLists=[]
		// if(lists){
		//  	newLists=this.props.lists.filter((list)=>list.OrderState==index)
		//  }
		return newLists
	}
	componentDidMount() {
		
	}
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

						<QueryConditions type={this.state.type}>
						</QueryConditions>

						<Spin
							tip="loading...."
							style={{width:"100%"}}
							delay={100}
							spinning={this.props.isFetching}
						>
								<TableBar
									dataSource={names} 
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
					</Spin>
				</div>
			)
	}
}

const mapStateToProps=state=>{
	const {PostSelect} = state
	const {names,isFetching} = PostSelect || {names:[],isFetching:true}
	return {
		isFetching,
		names
	}
}
const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(Query)