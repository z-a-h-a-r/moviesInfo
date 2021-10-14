// ====================================================
// IMPORTS
import './styles/zeroing.scss'
import './styles/style.scss'
import './styles/commonStyles.scss'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './reducers/appReducer'
import Loading from './components/loading/loading'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Content from './pages/content/content'
import Details from './pages/details/details'
import Main from './pages/main/main'

// ====================================================
// Component

const App = props => {
	const dispatch = useDispatch()

	// ====================================================
	// state

	const initialized = useSelector(state => state.app.initialized)

	// ====================================================
	// Side effects

	useEffect(() => {
		dispatch(initializeApp())
	}, [])

	// ====================================================
	// JSX

	return !initialized ? (
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

export default React.memo(App)
