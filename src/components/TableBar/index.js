import React,{Component} from 'react'
import './tablebat.css'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import { Table, Icon, Dropdown, Menu, Input, Button,Layout,message} from 'antd'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll} from '../../utils/config'
import Modal from '../Modal'
const { Header, Footer, Sider, Content } = Layout
import Get from '../../api/Get'
import Post from '../../api/Post'
const post = new Post()
const get = new Get()
class TableBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			columns:[],
			dataSource:[],
			showModal:false,
			modalWidth:"",
			modalTitle:"",
			request:false,
			statusId:"",
			details:false,
			type:false,
			workID:true,
			Rule:false,
			data:[],
			stateIDName:"",
			DataTitle:"",
			DataTypes:10,
			NameTYpe:Number


		}
	}
	componentDidMount() 
		
	 {  //componentWillMount会在组件render之前执行，并且永远都只执行一次
		this.setColums()
		this.setDataSource(this.props.dataSource)

		
	}
	componentWillReceiveProps(nextProps) {   //二次更新的时候
		if(nextProps.dataSource.length !==0){
	      this.setDataSource(nextProps.dataSource)
	    }
	    else{
	    	this.setState({
	    		dataSource:[]
	    	})
	    }
	}
	addBtn(){   //新增表单
		const {actions, pageId} = this.props 
		this.showModal()
		
		switch(this.props.types) {
			case 10:
				return this.setState({modalWidth:"960px",modalTitle:"新增工单",NameTYpe:10})	
				break;
			case 20:
				return 	this.setState({modalWidth:"960px",modalTitle:"新增日志",NameTYpe:10})
				break;
			case 30:
				return this.setState({modalWidth:"960px",modalTitle:"新增规则",NameTYpe:20})
				break;
			case 40:
				return this.setState({modalWidth:"960px",modalTitle:"角色分配",NameTYpe:10})

			
		}
		
		

		// if (this.props.type && this.props.fat) {
			
		// 	this.setState({modalWidth:"960px",modalTitle:"新增日志",request:false,type:true})
		// }
		// if (this.props.type && this.props.Rule) {

		// 	this.setState({modalWidth:"960px",modalTitle:"新增规则",request:false,Rule:true,workID:false})
		// }
		// if()

			
	}
	async editBtn(text){ //编辑工单
		const {actions} = this.props
		this.showModal()
		
		
		switch(this.props.types) {
			case 10:
				this.setState({modalWidth:"960px",modalTitle:"编辑工单",request:true,statusId:text.statusId,details:false,stateIDName:text.id,NameTYpe:50})
				
				actions.requesGetDetail(text.id)
				break;
			case 20:
				this.setState({modalWidth:"960px",modalTitle:"编辑日志",request:true,details:false,data:text,NameTYpe:30})
				
				
       			actions.journalData("")
				
				break;
		}
		
	
	}

	async deleteBtn(text){  //删除工单
		
	if (this.props.types == 20) {
		const res = await post.Delectshoift(text)
		if (res.code == 200) {
			
			const {actions} = this.props
       		 actions.journalData("")
       		 message.success("删除成功")
		}
	}
	if (this.props.types == 10) {
		const res = await post.DelectOrder(text)
		if (res.code == 200) {
			const data = {status:'0'}
			const {actions} = this.props
			actions.fetchPostsIfNeeded(data)	
			message.success("删除成功")
		}
		
	}
	if (this.props.types == 40) {
		 const res = await post.DelectRule(text)
		 
		if (res.code == 200) {
			 const {actions} = this.props
		 	 actions.RulePeole()
		 	 message.success("删除成功")
		}
		else{
			message.error(res.msg)
		}
		
	}
	if (this.props.types == 30) {  //删除没必要的规则
		if (text  == 0) {
			message.error("离职规则不允许删除")
			return 
		}
		const res = await  post.DelectRuleData(text)
		
		if (res.code == 200) {   //运行成功之后的规则
			const {actions} = this.props
			actions.RuleData()
			message.success("删除成功")
		}
		else{
			message.error(res.msg)
		}

	}

	
}
	delete(text){
		this.showModal()
		this.setState({modalWidth:"300",modalTitle:"提示",data:text.id,DataTitle:"删除",DataTypes:90,workID:false,NameTYpe:40})
	}

	filterFun(lists, index){  //把数组分解成字符串
		let array = []
		lists.map((list) => {
			list.pageId.map((item) =>{
				if (item == index) {
					array.push(list)
				}
			})
		})

		return array

	}
	showModal(){                //页面添加
		const {actions} = this.props
		this.setState({
			showModal:true
		})
	}

	setBtns(text, record){   //按钮
		const {pageId,addBtnPress} = this.props

		let btns = []
		if (addBtnPress) {
			btns = addBtnPress
		}
		
	
		return(
				<span>
					{
						btns.map((item,i) =>{
							return(
									<a href="javascript:;" onClick={this.handleClickBtn.bind(this,item.funIndex,text)} style={{padding:"0 3px"}}>
										{item.name}
									</a>
								)
						})
					}
				</span>
			)
		
	}
	setColums(){   //数据导入与操作按钮导入, 表单的头部标题，与操作按钮
		const {pageId} = this.props
		
		let columns =  this.filterFun(this.props.DataTitle, pageId) 
		const actionsColumn = [{title:'操作',width:'150', key: 'operation', render: (text, record) => this.setBtns(text, record) }]
		columns = columns.concat(actionsColumn)
		
		this.setState({
			columns
		})

		
	}
	detailsBtn(text){
		const {actions} = this.props
		this.showModal()
		switch(this.props.types) {
			case 10:
				this.setState({modalWidth:"960px",modalTitle:"工单详情",request:true,statusId:text.statusId,details:true,stateIDName:text.id,NameTYpe:80})
				
				actions.requesGetDetail(text.id)
				break;
			case 20:
				this.setState({modalWidth:"960px",modalTitle:"日志详情",request:true,details:true,data:text,statusId:text.statusId,NameTYpe:30})
				
				actions.fetchPrivilDetail(2)
				
				break;
		}

	}
	closeModal(){  //关闭弹窗
		const {actions} = this.props
		this.setState({
			showModal:false
		})
	}
	handleClickBtn(funIndex, text){   //操作工单按钮 删除与编辑逻辑
		switch(funIndex) {
			case "0":
				this.editBtn(text) //编辑
				break;
			case "9":
				this.delete(text)
				break;
			case "8":
				this.detailsBtn(text)

		}
	}
	eventContent(item){   //日志事件类型数据分析
		switch(item.type) {
			case 0:
				return item.type = "未指定"
				break;
			case 1:
				return item.type = "图形维护"
				break;
			case 2:
				return item.type = "投运对点"
				break;
			case 3:
				return item.type = "巡视联调"
				break;
			case 4:
				return item.type = "厂家运维"
				break;
		
		}

	}
	handover(item){  //是否交接数据处理
		switch(item.shift) {
			case 0:
				return item.shift = "否"
				break;
			case 1:
				return item.shift = "是"
				break;

		}
	}
	DayshiftWorkers(item){  //白班人员
		
		let data = [] 
		for (var i = 0; i < item.day.length; i++) {
		 	data.push(item.day[i].label+ "   ")
		 }
		return  item.day = data
		
		
		
	}
	NightshiftWorkers(item){   //夜班人员
		let data = [] 
		for (var i = 0; i < item.night.length; i++) {
		 	data.push(item.night[i].label+ "   ")
		 }
		
		return  item.night = data
	}
	ContactPersonnel(item){  //人员
		let data = [] 
		for (var i = 0; i < item.onSite.length; i++) {
		 	data.push(item.onSite[i].label+ "   ")
		 }
		
		return  item.onSite = data
	}


	rulesDetails(item){  //规则数据处理
		let data = [] 
		for (var i = 0; i < item.plan.length; i++) {
		 	data.push(item.plan[i] + "   ")
		 }
		 
		return  item.plan = data
	}
	AddData(item){

	}
	setDataSource(dataSource){     //表单数据给state
		dataSource.map((item,i)=>{
			item.key = i+1
			if (this.props.types == 30 || this.props.types == 40 ) {
						this.rulesDetails(item)
					}
			if (this.props.types == 20) {
				 item.shiftData = item.shift
				 item.typeData = item.type
				 item.dayData = item.day
				 item.nightData = item.night
				 item.onSiteData = item.onSite
				 
			 	 this.eventContent(item)   //事件类型处理
				 this.handover(item)   //是否交接
				 this.DayshiftWorkers(item) //白班人员
				 this.NightshiftWorkers(item) //夜班人员
	
				
				 this.ContactPersonnel(item)   //联系人员
			}

		})

		this.setState({
			dataSource
		})

	}
	test(data){

		if(data.length>0){
			
			data.map((item,i)=>{
			item.key = i+1
			if (this.props.types == 30 || this.props.types == 40 ) {
						this.rulesDetails(item)
					}
			if (this.props.types == 20) {
				 item.shiftData = item.shift
				 item.typeData = item.type
				 item.dayData = item.day
				 item.nightData = item.night
				 item.onSiteData = item.onSite
				 
			 	 this.eventContent(item)   //事件类型处理
				 this.handover(item)   //是否交接
				 this.DayshiftWorkers(item) //白班人员
				 this.NightshiftWorkers(item) //夜班人员
	
				
				 this.ContactPersonnel(item)   //联系人员
			}

		})
		this.setState({
			dataSource
		})
		}
		
	}
	filterBar(){
		if (this.state.dataSource.length == 0) {
			return  
		}
		if (this.props.types !== 10) {
			this.state.dataSource.map((item,i)=>{
					item.key = i+1
					if (this.props.types == 30 || this.props.types == 40 ) {
						this.rulesDetails(item)
					}

				})
			return this.state.dataSource
		}
		if (this.props.types == 10) {
			return this.state.dataSource
		}
		
	}
	pageSize(){
		switch(this.props.pageSize) {
			case 10:
				return 15
				break;
			case 20:
				return 10
				break;
			case 30:
				return 5
				break;
			
		}
	}
	render(){
		const {dataSource,columns,modalWidth,modalTitle,request,showModal,statusId,details,type,workID,Rule,data,stateIDName} = this.state
		
		
		return(
			<div className="tablebar">
				{this.props.addBtn&&
					<Button className="editable-add-btn"  type="ghost" onClick={this.addBtn.bind(this)}>{this.props.addBtn}
					</Button>
				}

				<Table 
					columns={columns}
					dataSource={this.filterBar()}
					scroll={{ y: this.props.height }}
					bordered
					size='middle'
					pagination={{ pageSize: this.pageSize() }}
				/>
				<Modal 
					ref="modal"
					modalWidth={modalWidth}
					modalTitle={modalTitle}
					visible={showModal}
					closeModal={this.closeModal.bind(this)}
					request={request}
					statusID={statusId}
					details={details}
					type={type}
					qxian={workID}
					Rule={Rule}
					typesData={this.props.types}
					data = {data}
					stateIDName = {this.state.stateIDName}
					detasx= {this.props.detasx}
					test={this.test.bind(this)}
					DataTitle={this.state.DataTitle}
					DataTypes={this.state.DataTypes}
					DatauploadName={this.deleteBtn.bind(this)}
					NameTYpe={this.state.NameTYpe}

				/>
			</div>
		)
	}
}


const mapStateToProps = state => {
	const { selectType } = state
	return{
		selectType
	}
}


const mapDispatchToProps=(dispatch)=>({
	actions:bindActionCreators(actions,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(TableBar) 