import React,{Component} from 'react'
import {Spin,Button} from 'antd'
import Modal from '../../components/Modal'
import Post from '../../api/Post'
import Get from '../../api/Get'
import TableBar from '../../components/TableBar'
import {columnsAll, actionsBtnsAll,actionsBtnSelect,OperationaAll,ruleDataSelect} from '../../utils/config'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actions from '../../actions'
const post = new Post()
const get=new Get()

class replace extends Component{
	render(){
		return(
				<div className="">
					
				</div>
			)
	}
}

export default replace