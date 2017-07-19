import React,{Component} from 'react'
import {Button,Spin,Layout} from 'antd'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux'
import TopBar from '../components/Topbar'
import NavBar from '../components/NavBar'
import * as actions from '../actions'
import Get from '../api/Get'
const get = new Get()
const { Header, Footer, Sider, Content } = Layout
class App extends Component{
	constructor(props) {     //初始值设定
		super(props);
		this.state={
			skinIndex:0,
			data:[]
		}
	}
	changeSkinIndex(index){
		this.setState({
			skinIndex:index,
			data:[],
		})
	}
	componentDidMount() {
		 this.props.actions.title("缺陷系统管理")
		 this.GetLatestFaultWorkOrderList()
	}
	componentWillReceiveProps(nextProps) {
		const data = nextProps.data
		if (data.length !== 0) {
			this.setState({
				data
			})
		}
	}
	 GetLatestFaultWorkOrderList(){
		const {actions} = this.props
		actions.fetchUserName()
	}
	render(){
		if(sessionStorage.refreshIndex>1){
			this.props.router.replace("/logout")
			return false
		}
		
		
		
		return(
				
				<div className="dashboard flex flex-column dashboardspeaciol" >
					<div className="header flex-0">
						<TopBar 
							changeSkinIndex={this.changeSkinIndex.bind(this)}
							title={this.props.title}
							 >
						</TopBar>
					</div>
					<div className="content flex-1 flex">
						<div className="nav">
							<NavBar data={this.state.data} />
						</div>
						<div className="wrapper flex-1 flex">
							{this.props.children}
						</div>
					</div>
					<div className="footer flex-0">
					</div>
 				</div>
				
			)
	}
}
const mapStateToProps = (state) => {
    return {
        title:state.settingState.title,
        data:state.AllPressmisonm
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)