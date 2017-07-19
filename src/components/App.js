import React,{Component} from 'react'
import {Button,Spin} from 'antd'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux'
import TopBar from './Topbar'
import NavBar from './NavBar'
import * as actions from '../actions'

class App extends Component{
	constructor(props) {     //初始值设定
		super(props);
		this.state={
			skinIndex:0,
		}
	}
	changeSkinIndex(index){
		this.setState({
			skinIndex:index
		})
	}
	componentDidMount() {
		 this.props.actions.title("缺陷系统管理")
	}
	render(){
		
		const skin = {backgroundImage:"url(../../assets/img/bg/bg"+ this.state.skinIndex + ".jpg"}
		return(
				<div className="app">
					<div className="dashboard flex flex-column" style={skin}>
						<div className="header flex-0">
							<TopBar 
								changeSkinIndex={this.changeSkinIndex.bind(this)}
								title={this.props.title} >
							</TopBar>
						</div>
						<div className="content flex-1 flex">
							<div className="nav">
								<NavBar />
							</div>
							<div className="wrapper flex-1 flex">
								{this.props.children}
							</div>
						</div>
						<div className="footer flex-0">
						</div>
 					</div>
				</div>
			)
	}
}
const mapStateToProps = (state) => {
    return {
        title:state.settingState.title,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)