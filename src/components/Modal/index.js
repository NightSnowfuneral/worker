import React,{Component} from 'react'
import {Modal,Button,Spin} from 'antd'
import "./modalbar.css"
import FromBar from '../FromBar'
import FromEditBar  from '../FromEditBar'
import FromRoulData from '../FromRoul'
import CaoNameBar from '../CaoNameBar'
import DataAddDefectName from '../DataAddDefectName'
import MangerFoorbar from '../MangerFoorbar'
import classnames from 'classnames'
import AllotUser from '../AlloutUser'
class Modalbar extends Component{

	handleOk(){   //提交之后关闭
			this.props.closeModal()
		}
	handleCancel(e){  //直接关闭
			
			this.props.closeModal()
		}
	handlerName(e){
		this.props.DatauploadName(e)

	}
	handlerParam(e){
		this.props.paramIdData(e)
	}
	addBtn(){
		const addBtnHtml = <FromBar                                    //新增工单
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}
						type={this.props.type}
						types = {this.props.typesData}
					>
					</FromBar>
		return addBtnHtml
	}
	editBtn(){
		const edit = <FromEditBar                                  //编辑工单
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}

						statusID={this.props.statusID}
						details={this.props.details}
						types = {this.props.typesData}
						data = {this.props.data}
						stateIDName={this.props.stateIDName}
						detasx= {this.props.detasx}
					  >	
					 </FromEditBar>
		return edit
	}
	Defect(){
		const edit = <DataAddDefectName                                  //编辑工单
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}
						statusID={this.props.statusID}
						details={this.props.details}
						types = {this.props.typesData}
						data = {this.props.data}
						stateIDName={this.props.stateIDName}
						detasx= {this.props.detasx}
					  >	
					 </DataAddDefectName>
		return edit
	}
	MangerFooter(){
		const add = <MangerFoorbar
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}
						paramId = {this.props.paramId}
						paramIdData={this.handlerParam.bind(this)}
						refresh = {this.props.refresh}
						paramsId={this.props.paramsId}
						>
					</MangerFoorbar>
		return add
	}
	workId(){   //编辑作用
		// if (this.props.qxian) {
		// 	if (this.props.request) {
		// 		return this.editBtn()
		// 	}
		// 	else{
		// 		return this.addBtn()
				
		// 	}
		// }
		switch(this.props.NameTYpe) {
			case 10:
				return this.addBtn()
				break;
			case 30:
				return this.editBtn()
				break;
			case 20:
				return this.addRuleData()
			case 40:
				return this.huangban()	//删除
			case 50:
				return this.Defect()  //工单编辑
			case 80:
				return this.Defect() //工单详情
			case 90:
				return this.MangerFooter()  //角色编辑与新增
			case 100:
				return this.AllotUserName()  //角色编辑中的人员编辑
		}
		
	}
	AllotUserName(){
		const edit = <AllotUser 
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}
						paramId = {this.props.paramId}
						paramIdData={this.handlerParam.bind(this)}
					/>
		return edit

	}
	addRuleData(){
		const add = <FromRoulData
						modalVisible = {this.props.visible}
						closeModal = {this.handleCancel.bind(this)}
						request = {this.props.request}
						types = {this.props.typesData}
					>
					</FromRoulData>
		return add
	}
	addRule(){  //规则
		
		if (this.props.Rule) {
			return this.addRuleData()
		}
		else{
			return ""
		}
	}
	huangban(){  //换班
		const add = <CaoNameBar
					modalVisible = {this.props.visible}
					closeModal = {this.handleCancel.bind(this)}
					DataTypes = {this.props.DataTypes}
					DataTitle = {this.props.DataTitle}
					handlerName={this.handlerName.bind(this)}
					data = {this.props.data}


					/>
		return add

	}
	CaozuoBUt(){  //删除与换班的弹窗
		switch(this.props.DataTypes) {
			case 80:
				
				return this.huangban()	
				break;
		
		}
	}

	render(){
		return(
				<Modal
					width={this.props.modalWidth}
					title={this.props.modalTitle}
					style={{ top: "14%" }}
					visible={this.props.visible}
					wrapClassName={classnames({"active":this.props.typesData})}
					onOk= {this.handleOk.bind(this)}
					onCancel = {this.handleCancel.bind(this)}
					footer={false}
					maskClosable={false}
					
				>
				{this.workId()}
				{this.CaozuoBUt()}
				
				</Modal>
				
			)
	}
}



export default Modalbar