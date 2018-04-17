import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux' 
import currentAlbum from './currentAlbum'
import currentSearch from './currentSearch'
import login from './login'

const rootReducer = combineReducers({
	currentAlbum,
	currentSearch,
	login,
	//router: routerReducer
})

export default rootReducer;