// ====================================================
// IMPORTS
import styles from './details.module.scss'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	cleanDetailsPage,
	getDetails,
} from '../../reducers/getDataFromAPIReducer'
import * as queryString from 'querystring'
import { useHistory } from 'react-router'

// ====================================================
// Component

const Details = props => {
	const history = useHistory()
	const dispatch = useDispatch()
	let parsedUrl = queryString.parse(history.location.search.substr(1))
	let pageTypeForAPI = useRef()

	// ====================================================
	// Side Effects

	useEffect(() => {
		// dispatch(cleanDetailsPage())

		if (parsedUrl.type === 'movies') {
			pageTypeForAPI.current = 'movie'
		} else if (parsedUrl.type === 'tvShows') {
			pageTypeForAPI.current = 'tv'
		} else if (parsedUrl.type === 'people') {
			pageTypeForAPI.current = 'person'
		}

		dispatch(getDetails(pageTypeForAPI.current, parsedUrl.id))
	}, [])

	// ====================================================
	// state

	let data = useSelector(state => state.dataFromAPI.detailsPageCurrentData)

	// ====================================================
	// JSX

	let searchData = useSelector(
		state => state.dataFromAPI.detailsPageCurrentData
	)

	// ====================================================

	return (
		<div className={styles.body}>
			<section className={styles.firstSection}>
				<img
					src={`https://image.tmdb.org/t/p/w500${
						data.poster_path ? data.poster_path : data.profile_path
					}`}
					alt=""
					className={styles.poster}
				/>
				<div className={styles.firstSectionInfo}>
					<p className={styles.title}>
						{pageTypeForAPI.current === 'movie'
							? data.title
							: pageTypeForAPI.current === 'tv'
							? data.name
							: data.name}
					</p>
					<p className={styles.tagline}>{data.tagline}</p>

					<div className={styles.infoCard}>
						{pageTypeForAPI.current === 'movie' ||
						pageTypeForAPI.current === 'tv' ? (
							<>
								<p className={styles.info}>
									Genres: {data.genres.map(item => item.name + '. ')}
								</p>
								<p className={styles.info}>Vote average: {data.vote_average}</p>
								<p className={styles.info}>Status: {data.status}</p>
								<p className={styles.info}>
									{pageTypeForAPI.current === 'movie'
										? `Runtime: ${data.runtime} min`
										: pageTypeForAPI.current === 'tv'
										? `Episode runtime: ${data.episode_run_time} min`
										: ''}
								</p>
								<p className={styles.info}>Release date: {data.release_date}</p>
								<p className={styles.info}>
									Original language: {data.original_language}
								</p>
								<p className={styles.info}>
									Genres:{' '}
									{data.production_countries.map(item => item.name + '. ')}
								</p>
								{data.budget ? (
									<p className={styles.info}>Budget: {data.budget}$</p>
								) : (
									''
								)}

								{data.homepage.string !== 0 ? (
									<div className={styles.info}>
										homepage:{' '}
										<a
											href={data.homepage}
											className={styles.link}
											target="_blank"
										>
											{data.homepage}
										</a>
									</div>
								) : (
									''
								)}
								<p className={styles.overview}>Overview: {data.overview}</p>
							</>
						) : (
							<p>
								<p className={styles.info}>Birthday: {data.birthday}</p>
								{data.deathday ? (
									<p className={styles.info}>Birthday: {data.deathday}</p>
								) : (
									''
								)}
								<p className={styles.info}>
									Known for department: {data.known_for_department}
								</p>
								<p className={styles.info}>Popularity: {data.popularity}</p>
								<p className={styles.info}>
									Place of birthday: {data.place_of_birth}
								</p>
								<p className={styles.overview}>Biography: {data.biography}</p>
							</p>
						)}
					</div>
				</div>
			</section>
			{pageTypeForAPI.current === 'movie' || pageTypeForAPI.current === 'tv' ? (
				<section className={styles.companies}>
					{data.production_companies.map(item => {
						return (
							<div className={styles.companiesCard}>
								{item.logo_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
										alt=""
										className={styles.companiesPoster}
									/>
								) : (
									<div className={styles.withoutPoster}>Logo not found</div>
								)}

								<p className={styles.companiesName}>{item.name}</p>
							</div>
						)
					})}
				</section>
			) : (
				''
			)}
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Details)
