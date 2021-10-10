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
import CompanyCard from './companyCard/companyCard'
import InfoCard from './infoCard/infoCard'

// ====================================================
// Component

const Details = props => {
	const history = useHistory()
	const dispatch = useDispatch()
	const topRef = useRef(null)
	let parsedUrl = queryString.parse(history.location.search.substr(1))
	let pageTypeForAPI = useRef()

	// ====================================================
	// Side Effects

	useEffect(() => {
		if (parsedUrl.type === 'movies') {
			pageTypeForAPI.current = 'movie'
		} else if (parsedUrl.type === 'tvShows') {
			pageTypeForAPI.current = 'tv'
		} else if (parsedUrl.type === 'people') {
			pageTypeForAPI.current = 'person'
		}
		topRef.current.scrollIntoView()
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
		<>
			<div ref={topRef} className={styles.topRef}></div>
			<div className={styles.body}>
				<img
					src={`https://image.tmdb.org/t/p/w500${
						data.poster_path ? data.poster_path : data.profile_path
					}`}
					alt=""
					className={styles.poster}
				/>

				<div>
					<div className={styles.heading}>
						<p className={styles.title}>
							{pageTypeForAPI.current === 'movie'
								? data.title
								: pageTypeForAPI.current === 'tv'
								? data.name
								: data.name}
						</p>
						<p className={styles.tagline}>{data.tagline}</p>
					</div>

					{(pageTypeForAPI.current === 'movie' ||
						pageTypeForAPI.current === 'tv') && (
						<div className={styles.info}>
							<InfoCard
								content={`Genres: ${data.genres.map(item => item.name)}`}
							/>
							<InfoCard content={`Vote average: ${data.vote_average}`} />
							<InfoCard content={`Status: ${data.status}`} />
							<InfoCard
								content={
									pageTypeForAPI.current === 'movie'
										? `Runtime: ${data.runtime} min`
										: pageTypeForAPI.current === 'tv'
										? `Episode runtime: ${data.episode_run_time} min`
										: ''
								}
							/>
							<InfoCard content={`Release date: ${data.release_date}`} />
							<InfoCard
								content={`Original language: ${data.original_language}`}
							/>
							<InfoCard
								content={`Production countries: ${data.production_countries.map(
									item => item.name
								)}`}
							/>
							{!!data.budget && (
								<InfoCard content={`Budget: ${data.budget}$`} />
							)}
							{data.homepage && data.homepage.string !== 0 && (
								<InfoCard content={`Homepage: `}>
									<a
										href={data.homepage}
										className={styles.link}
										target="_blank"
									>
										{data.homepage}
									</a>
								</InfoCard>
							)}
						</div>
					)}

					{(pageTypeForAPI.current === 'movie' ||
						pageTypeForAPI.current === 'tv') && (
						<p className={styles.overview}>Overview: {data.overview}</p>
					)}

					{pageTypeForAPI.current === 'person' && (
						<div className={styles.info}>
							<InfoCard content={`Birthday: ${data.birthday}`} />
							{data.deathday && (
								<InfoCard content={`Deathday: ${data.deathday}`} />
							)}
							<InfoCard
								content={`Known for department: ${data.known_for_department}`}
							/>
							<InfoCard content={`Popularity: ${data.popularity}`} />
							<InfoCard content={`Place of birthday: ${data.place_of_birth}`} />

							<p className={styles.overview}>Biography: {data.biography}</p>
						</div>
					)}
				</div>

				{(pageTypeForAPI.current === 'movie' ||
					pageTypeForAPI.current === 'tv') && (
					<section className={styles.companies}>
						{data.production_companies.map(item => {
							return <CompanyCard name={item.name} logo_path={item.logo_path} />
						})}
					</section>
				)}
			</div>
		</>
	)
}

// ====================================================
// Exports

export default React.memo(Details)
