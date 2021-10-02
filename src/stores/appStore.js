// ====================================================
// Imports
// Main
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers/appReducer'

// ====================================================
// CombineReducers

let reducers = combineReducers({
	app: appReducer,
})

// ====================================================
// Store

let store = createStore(reducers, compose(applyMiddleware(thunk)))

// ====================================================
// Exports

export default store
