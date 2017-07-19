import React,{Component} from 'react'
import {Spin} from 'antd'
class Defects extends Component{
	render(){
		return (
				<div className="Defects flex flex-1">
					{this.props.children}
				</div>
			)
	}
}
export default Defects