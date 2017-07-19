import { applyMiddleware,createStore,compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composedCreateStore=compose(
	applyMiddleware(thunk),
/*	window.devToolsExtension && window.devToolsExtension()*/
)(createStore)

const configureStore=(initialState={})=>{
	const store=composedCreateStore(rootReducer,initialState)

	return store
}

export default configureStore
