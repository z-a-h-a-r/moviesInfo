// ====================================================
// Imports
// Main
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers/appReducer'
import getDataFromAPIReducer from '../reducers/getDataFromAPIReducer'

// ====================================================
// CombineReducers

let reducers = combineReducers({
	app: appReducer,
	dataFromAPI: getDataFromAPIReducer,
})

// ====================================================
// Store

let store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

// ====================================================
// Exports

export default store
