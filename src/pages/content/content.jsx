// ====================================================
// IMPORTS
import styles from './content.module.scss'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getPopular, search } from '../../reducers/dataReducer'
import * as queryString from 'querystring'
import Search from '../../components/search/search'
import NoSearchData from '../../components/noSearchData/noSearchData'
import Card from '../../components/card/card'

// ====================================================
// Component

const Content = props => {
	const dispatch = useDispatch()
	const history = useHistory()
	let parsedUrl = queryString.parse(history.location.search.substr(1))
	let pageCounter = useRef(1)
	let pageTypeForAPI = useRef()

	// ====================================================
	// state

	let trendingData = useSelector(state => {
		if (props.contentType === 'movies') {
			return state.data.moviesPageCurrentData.trending
		} else if (props.contentType === 'tvShows') {
			return state.data.tvShowsPageCurrentData.trending
		} else if (props.contentType === 'people') {
			return state.data.peoplePageCurrentData.trending
		}
	})
	let searchData = useSelector(state => {
		if (props.contentType === 'movies') {
			return state.data.moviesPageCurrentData.search
		} else if (props.contentType === 'tvShows') {
			return state.data.tvShowsPageCurrentData.search
		} else if (props.contentType === 'people') {
			return state.data.peoplePageCurrentData.search
		}
	})

	// ====================================================
	// Side Effects

	useEffect(() => {
		if (props.contentType === 'movies') {
			pageTypeForAPI.current = 'movie'
		} else if (props.contentType === 'tvShows') {
			pageTypeForAPI.current = 'tv'
		} else if (props.contentType === 'people') {
			pageTypeForAPI.current = 'person'
		}
		if (!searchData.results && parsedUrl.query && parsedUrl.query.length > 0) {
			dispatch(search(null, parsedUrl.query, pageTypeForAPI.current))
		}
	}, [])

	useEffect(() => {
		if (history.location.pathname === `/${props.contentType}/popular`) {
			dispatch(getPopular(pageTypeForAPI.current, 1))
		}
		pageCounter.current = 1
	}, [parsedUrl.query || window.location.pathname])

	// ====================================================
	// Functions

	const searchCallback = query => {
		if (query.query || 0 === !query.query.length) {
			new Promise((resolve, reject) => {
				dispatch(search(resolve, query.query, pageTypeForAPI.current))
			}).then(() => {
				history.push({
					pathname: `/${props.contentType}/`,
					search: `query=${query.query}`,
				})
			})
		}
	}

	const loadMoreSearch = () => {
		if (
			searchData.total_pages > 1 &&
			searchData.total_pages > pageCounter.current
		) {
			pageCounter.current += 1
			dispatch(
				search(
					null,
					parsedUrl.query,
					pageTypeForAPI.current,
					pageCounter.current,
					true
				)
			)
		}
	}

	const loadMoreTrending = () => {
		if (trendingData.total_pages > pageCounter.current) {
			pageCounter.current += 1
			dispatch(getPopular(pageTypeForAPI.current, pageCounter.current, true))
		}
	}

	// ====================================================
	// JSX

	return (
		<div className={styles.body}>
			<h1 className={styles.title}>{props.contentType}</h1>
			<div className={styles.bar}>
				<Search type={props.contentType} callback={searchCallback} />
				<div></div>
				<NavLink
					to={`/${props.contentType}/popular`}
					onClick={() => {
						dispatch(getPopular(pageTypeForAPI.current, 1))
					}}
					className={styles.popularButton}
				>
					Popular {props.contentType}
				</NavLink>
			</div>

			{history.location.pathname === `/${props.contentType}/popular` ? (
				<>
					<div className={styles.cardsWrap}>
						{trendingData.results.map(item => {
							let index = trendingData.results.indexOf(item)
							return (
								<Card
									key={index}
									imgUrl={
										props.contentType === 'people'
											? item.profile_path
											: item.poster_path
									}
									title={
										props.contentType === 'people' ||
										props.contentType === 'tvShows'
											? item.name
											: item.title
									}
									type={props.contentType}
									id={item.id}
								/>
							)
						})}
					</div>
					<button
						onClick={loadMoreTrending}
						className={styles.getMoreDataButton}
					>
						Load more
					</button>
				</>
			) : (
				<>
					{searchData.total_results ? (
						<>
							{parsedUrl.query ? (
								<p className={styles.search}>Search: {parsedUrl.query}</p>
							) : (
								''
							)}
							<div className={styles.cardsWrap}>
								{searchData.results.map(item => {
									let index = searchData.results.indexOf(item)

									return (
										<Card
											key={index}
											imgUrl={
												props.contentType === 'people'
													? item.profile_path
													: item.poster_path
											}
											title={
												props.contentType === 'people' ||
												props.contentType === 'tvShows'
													? item.name
													: item.title
											}
											type={props.contentType}
											id={item.id}
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

export default React.memo(Content)
