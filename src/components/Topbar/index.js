import React,{Component} from 'react'
import {Link} from 'react-router'
import { Menu, Dropdown,Layout } from 'antd'
import './Topbar.css'
import Get from '../../api/Get'
import Post from '../../api/Post'
const post = new Post()
const get = new Get()
const { Header, Footer, Sider, Content } = Layout

class TopBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			data:[]
		}
	}
	componentDidMount() {
		this.setCommonData()
	}
	renderSkin(){
		const array=["1","2","3","4","5","6","7","8","9","10","11","12"]
		return(
				<Menu className="dmenu flex flex-wrap" 
					  onClick={this.handleButtonClick.bind(this)}
				>
					{
						array.map((item) => {
							return(
								<Menu.Item key={item} className="flex-0 small-bg" style={{backgroundImage:"url(../../../assets/img/bg/small/small-bg" + item +".jpg)"}}>
								</Menu.Item>
							)
						})
					}
				</Menu>	
			)
	}
	handleButtonClick(e){
		this.props.changeSkinIndex(e.key)
	}
	async setCommonData(){ //获取初始值
			var Common = await get.commonData()  //启动获取数据的函数
			
			if (Common.code == 200) {
				this.setState({
					data:Common,
				
				})
			
			}

			
			
		}
	render(){
		const {data} = this.state
	
		return(
			<div className = "topbar flex flex-stretch">
				<div className=" flex-1 flex flex-align-center ">
					<Link to = "/" className="title head_title">{this.props.title}</Link>
				</div>
				<div className="flex flex-stretch">
					<a className="dropdown flex flex-align-center" href="javascript:;">
					</a>
				</div>
				<div className="skin flex flex-stretch">
					<div className="setting flex flex-stretch">
					<Link className="antd-dropdown-a dropdown flex flex-align-center" >
						<i className="iClass fa fa-fw">
						</i>
						{data.userName}
					</Link>
				</div>
					<Dropdown 
						overlay={this.renderSkin()} 
						trigger={['click']}
					>	

					    <a className="ant-dropdown-a dropdown flex flex-align-center" href="javascript:;">
					    	<i className="iClass fa fa-adjust"></i>
					      	皮肤
						 </a>
					</Dropdown>

				</div>
				
				<div className="setting flex flex-stretch">
					<Link className="antd-dropdown-a dropdown flex flex-align-center" to="/logout">
						<i className="iClass fa fa-sign-out fa-fw">
						</i>
						退出
					</Link>
				</div>
			</div>		
		)
	}
}


export default TopBar