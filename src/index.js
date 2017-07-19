
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
import routes from './router'
import 'antd/dist/antd.css'
import '../assets/fonts/css/font-awesome.css'
import '../assets/css/global.css'
import '../assets/css/admin.css'

let store = configureStore()

const rootElement=document.getElementById('app')

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	
	
	rootElement
)
