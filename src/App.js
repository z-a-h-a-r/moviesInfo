// ====================================================
// IMPORTS
import './styles/zeroing.scss'
import './styles/style.scss'
import './styles/commonStyles.scss'
import Loading from './components/loading/loading'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router'
import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeApp } from './reducers/appReducer'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Movies from './pages/movies/movies'
import People from './pages/people/people'
import TvShows from './pages/tvShows/tvShows'

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
	return !props.initialized ? (
		<Loading />
	) : (
		<div className="body">
			<Header />
			<div className="container">
				<Route path="/movies/:popular?" render={() => <Movies />} />
				<Route path="/tvShows" render={() => <TvShows />} />
				<Route path="/people" render={() => <People />} />
			</div>
			<Footer />
		</div>
	)
}

// ====================================================
// Exports

let mapStateToProps = state => ({ initialized: state.app.initialized })
export default React.memo(compose(connect(mapStateToProps, {}))(App))
