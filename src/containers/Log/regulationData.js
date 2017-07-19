import React,{Component} from 'react'
import {Spin,Button} from 'antd'
import Modal from '../../components/Modal'
import Post from '../../api/Post'
import Get from '../../api/Get'
import TableBar from '../../components/TableBar'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll,ruleDataSelect} from '../../utils/config'
const post = new Post()
const get=new Get()
class regulation extends Component{
	constructor(props) {
		super(props);
		this.state={
			modalWidth:"",
			modalTitle:"",
			request:false,
			showModal:false,
			Rule:true,
			names:[],
			type:true
		}
	}
	componentDidMount(){
		this.GetLatestFaultWorkOrderList()
	}
	async GetLatestFaultWorkOrderList(){
		const res = await get.schedulePlan()
		if (res.code == 200) {
			this.setState({
				names:res.plans
			})
		}
		
	}
	
	
	render(){
		 const {modalWidth,modalTitle,showModal,request} = this.state
		 const pageId = "1"
		
		
		return(
				<div className="regulation fault flex flex-1">
					<Spin
							spinning={false}
							tip="Loading..."
							style={{width:"100%"}}
						>
						
						<TableBar
							dataSource={this.state.names} 
							pageId={pageId}
							addBtn={"新增规则"}
							Rule={this.state.Rule}
							type = {this.state.type}
							DataTitle={ruleDataSelect}


						/>
						
					</Spin>
				</div>
			)
		}
	
}

export default regulation