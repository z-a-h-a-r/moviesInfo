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

// ====================================================
// Component

const App = props => {
	// Variables
	const history = useHistory()

	// ====================================================
	// Side effects

	// ====================================================
	// JSX
	return (
		<>
			<Loading />{' '}
		</>
	)
}

// ====================================================
// Exports

let mapStateToProps = state => ({})
export default React.memo(compose(connect(mapStateToProps, {}))(App))
