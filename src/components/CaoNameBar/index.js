import React,{Component} from 'react'
import './index.css'
import { Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker,message,Checkbox,Spin } from 'antd'
class CaoNameBat extends Component{
	handler(){  //取消按钮
		this.props.closeModal()
	}
	handleData(){
		switch(this.props.DataTypes) {
			case 80:
				this.props.handlerName()
				this.props.closeModal()
				break;
			case 90:
				this.props.handlerName(this.props.data)
				this.props.closeModal()
				break;
		}
		
	}
	render(){

		return (
				<div className="amtdName">
					<div className="ant-confirm-body-wrapper">
						<div className="ant-confirm-body">
							<i className="anticon anticon-question-circle atime"></i>
							<span className="ant-confirm-title">你确定{this.props.DataTitle}吗</span>

						</div>
						<div className="ant-confirm-btnsName" >
							<Button  style={{marginRight:"8px"}} onClick={this.handler.bind(this)}><span>取消</span></Button>
							<Button type="primary" onClick={this.handleData.bind(this)}><span>确定</span></Button>
						</div>

					</div>
				</div>
			)
	}
}



export default CaoNameBat