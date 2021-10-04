// ====================================================
// IMPORTS
import styles from './contentPage.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Search from '../../components/search/search'
import NoSearchData from '../../components/noSearchData/noSearchData'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../reducers/getDataFromAPIReducer'
import Card from '../../components/card/card'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import * as queryString from 'querystring'
import { getPopular } from '../../reducers/getDataFromAPIReducer'

// ====================================================
// Component

const ContentPage = props => {
	const dispatch = useDispatch()
	const history = useHistory()
	let parsedUrl = queryString.parse(history.location.search.substr(1))
	let pageCounter = useRef(1)
	let pageTypeForAPI = useRef(1)

	// ====================================================
	// state

	let trendingData = useSelector(state => {
		if (props.contentType === 'movies') {
			return state.dataFromAPI.moviesPageCurrentData.trending
		} else if (props.contentType === 'tvShows') {
			return state.dataFromAPI.tvShowsPageCurrentData.trending
		} else if (props.contentType === 'people') {
			return state.dataFromAPI.peoplePageCurrentData.trending
		}
	})
	let searchData = useSelector(state => {
		if (props.contentType === 'movies') {
			return state.dataFromAPI.moviesPageCurrentData.search
		} else if (props.contentType === 'tvShows') {
			return state.dataFromAPI.tvShowsPageCurrentData.search
		} else if (props.contentType === 'people') {
			return state.dataFromAPI.peoplePageCurrentData.search
		}
	})

	// ====================================================
	// Side Effects

	useEffect(() => {
		if (!searchData.results) {
			dispatch(search(null, parsedUrl.query, props.contentType))
		}

		if (props.contentType === 'movies') {
			pageTypeForAPI.current = 'movie'
		} else if (props.contentType === 'tvShows') {
			pageTypeForAPI.current = 'tv'
		} else if (props.contentType === 'people') {
			pageTypeForAPI.current = 'person'
		}
	}, [])
	useEffect(() => {
		pageCounter.current = 1

		if (history.location.pathname === `/${props.contentType}/popular`) {
			dispatch(getPopular(pageTypeForAPI.current, 1))
		}
	}, [parsedUrl.query || window.location.pathname])

	// ====================================================
	// Functions

	const callback = query => {
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
					props.contentType,
					pageCounter.current,
					true
				)
			)
		}
	}

	const loadMoreTrending = () => {
		if (trendingData.total_pages > pageCounter.current) {
			pageCounter.current += 1
			dispatch(getPopular(props.contentType, pageCounter.current, true))
		}
	}

	// ====================================================
	// JSX

	return (
		<div className={styles.body}>
			<h1 className={styles.title}>{props.contentType}</h1>
			<div className={styles.bar}>
				<Search type={props.contentType} callback={callback} />
				<div></div>

				<NavLink
					to={`/${props.contentType}/popular`}
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

export default ContentPage
