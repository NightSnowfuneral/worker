import React,{Component} from 'react'
import { withRouter } from 'react-router'
import { message } from 'antd'

class Logout extends Component {
	componentDidMount() {
		this.logoutAjax()
	}
	logoutAjax(){
		delete sessionStorage.LoginId
		message.success("退出成功")
		this.props.router.replace('login')

	}


	render(){
		return(
				<div className="logout">
					<p>你正在退出</p>
				</div>
			)
	}
}

export default withRouter(Logout)