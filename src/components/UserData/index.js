import React,{Component} from 'react'
import {Link} from 'react-router'
import {Menu, Icon} from 'antd'
import './index.css'

const SubMenu = Menu.SubMenu
class NavbarDate extends Component{
	constructor(props) {
		super(props);
		this.state={
			names:[],
			current:'1'
		}
	}
	componentDidMount() {
		this.setDataSource(this.props.data)
	}
	componentWillReceiveProps(nextProps) {
		const NameData = nextProps.data
		if (NameData.length !==0) {
			this.setDataSource(nextProps.data)
		}
	}
	setDataSource(data){
		this.setState({
			names:data
		})
	}
	handleClick(e){  //点击改变状态
		this.setState({current: e.key});
	}
	handler(id){
		this.props.detele(id)
	}
	onChange(id){
		this.props.onChange(id)
	}
	render(){
		let subId=0,menuId=0
		
		return(
				<Menu
				className="navbarDatae"
		        mode="inline"
		        inlineIndent={0}
		        onClick={this.handleClick.bind(this)}
		        defaultSelectedKeys={['1']}
          		defaultOpenKeys={['sub1']}
		        
		        style={{height:80, width: 150,background:'transparent' }}
		        
		    	>
		    		<SubMenu className="menu_sub" key="sub1"  title={<span><Icon type="appstore" /><span>所有人员</span></span>} style={{height:'50px'}} >
		    			{
		    				this.state.names.map((item,i)=>{
		    					menuId+=1
		    					return  (
		      			    		<Menu.Item className="menu_item" key={menuId} style={{width:"123px",height:'50px',lineHeight:'50px',paddingLeft:"0",paddingRight:"0"}} className="LinkParamPer" >										
		      			    			<Link  to={'/system/Personnel/Assign/' + item.id} style={{color:'black'}} className="LinkParamPer"  >
		      			    					<Icon type="user" />
		      			    					<div className="positions">
		      			    						<div className="DivClass DivClassTop" >
		      			    							{item.name}
		      			    						</div>
		      			    						<div className="DivClass DivClassColor">
		      			    							{item.department}
		      			    						</div>
		      			    					</div>
		      			    			</Link>
		      			    		</Menu.Item>
		      			    	)
		    				})
		    			}
		    		</SubMenu>
		    	</Menu>

			)
	}
}


export default NavbarDate