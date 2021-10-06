// ====================================================
// IMPORTS
import './styles/zeroing.scss'
import './styles/style.scss'
import './styles/commonStyles.scss'
import Loading from './components/loading/loading'
import { Route } from 'react-router-dom'
import { Redirect, Switch, useHistory } from 'react-router'
import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeApp } from './reducers/appReducer'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Content from './pages/content/content'
import Details from './pages/details/details'
import Main from './pages/main/main'

// ====================================================
// Component

const App = props => {
	// Variables
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
				<Switch>
					<Route
						path="/movies/:popular?"
						render={() => <Content contentType="movies" key={1} />}
					/>
					<Route
						path="/tvShows/:popular?"
						render={() => <Content contentType="tvShows" key={2} />}
					/>
					<Route
						path="/people/:popular?"
						render={() => <Content contentType="people" key={3} />}
					/>
					<Route path="/details" render={() => <Details />} />
					<Route path="/" render={() => <Main />} />
				</Switch>
			</div>
			<Footer />
		</div>
	)
}

// ====================================================
// Exports

let mapStateToProps = state => ({ initialized: state.app.initialized })
export default React.memo(compose(connect(mapStateToProps, {}))(App))
