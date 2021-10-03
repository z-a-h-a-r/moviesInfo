// ====================================================
// IMPORTS
import styles from './movies.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Search from '../../components/search/search'
import NoSearchData from '../../components/noSearchData/noSearchData'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../reducers/getDataFromAPIReducer'
import Card from '../../components/card/card'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import * as queryString from 'querystring'

// ====================================================
// Component

const Movies = props => {
	const dispatch = useDispatch()
	const history = useHistory()
	let parsedUrl = queryString.parse(history.location.search.substr(1))
	let pageCounter = useRef(1)

	// ====================================================
	// state

	const trendingData = useSelector(
		state => state.dataFromAPI.moviesPageCurrentData.trending.results
	)
	const searchData = useSelector(
		state => state.dataFromAPI.moviesPageCurrentData.search
	)

	// ====================================================
	// Side Effects

	useEffect(() => {
		if (!searchData.results) {
			dispatch(search(null, parsedUrl.query, 'movie'))
		}
	}, [])
	useEffect(() => {
		pageCounter.current = 1
	}, [parsedUrl.query || window.location.pathname])

	// ====================================================
	// Functions

	const callback = query => {
		history.push({
			pathname: '/movies/',
			search: `query=${query.query}`,
		})
		dispatch(search(null, query.query, 'movie'))
	}
	const loadMoreSearch = () => {
		pageCounter.current += 1
		dispatch(search(null, parsedUrl.query, 'movie', pageCounter.current, true))
	}
	const getMoreTrending = () => {
		dispatch(search(null, parsedUrl.query, 'movie', 2))
	}

	// ====================================================
	// JSX

	return (
		<div className={styles.body}>
			<h1 className={styles.title}>Movies</h1>
			<div className={styles.bar}>
				<Search type={'movies'} callback={callback} />
				<div></div>

				<NavLink to="/movies/popular" className={styles.popularButton}>
					See popular movies
				</NavLink>
			</div>

			{history.location.pathname === '/movies/popular' ? (
				<>
					<div className={styles.cardsWrap}>
						{trendingData.map(item => {
							let index = trendingData.indexOf(item)

							return (
								<Card
									key={index}
									imgUrl={item.poster_path}
									title={item.title}
								/>
							)
						})}
					</div>
				</>
			) : (
				<>
					{searchData.results ? (
						<>
							<div className={styles.cardsWrap}>
								{searchData.results.map(item => {
									let index = searchData.results.indexOf(item)

									return (
										<Card
											key={index}
											imgUrl={item.poster_path}
											title={item.title}
										/>
									)
								})}
							</div>
							<button
								onClick={loadMoreSearch}
								className={styles.getMoreDataButton}
							>
								Load more
							</button>
						</>
					) : (
						<NoSearchData />
					)}
				</>
			)}
		</div>
	)
}

// ====================================================
// Exports

export default Movies
