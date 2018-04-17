import reducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
//import { routerMiddleware } from 'react-router-redux'
//import createHistory from 'history/createMemoryHistory'

//export const history = createHistory();
const middleware = [ thunk/*, routerMiddleware(history) */]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store;