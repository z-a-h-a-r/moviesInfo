// ====================================================
// IMPORTS
import './styles/zeroing.scss'
import './styles/style.scss'
import Loading from './components/loading/loading'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router'
import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getTrending, initializeApp, search } from './reducers/appReducer'

// ====================================================
// Component

const App = props => {
	// Variables
	const history = useHistory()
	const dispatch = useDispatch()

	// ====================================================
	// Side effects

	useEffect(() => {
		dispatch(initializeApp())
	}, [])

	// ====================================================
	// JSX
	return <>{!props.initialized ? <Loading /> : 'done!'}</>
}

// ====================================================
// Exports

let mapStateToProps = state => ({ initialized: state.app.initialized })
export default React.memo(compose(connect(mapStateToProps, {}))(App))
