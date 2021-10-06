// ====================================================
// IMPORTS
import styles from './card.module.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ====================================================
// Component

const Card = props => {
	let bg_path = useSelector(state => {
		if (props.forUrl === 'movies') {
			return state.dataFromAPI.moviesPageCurrentData.trending.results[0]
				.backdrop_path
		} else if (props.forUrl === 'people') {
			return state.dataFromAPI.peoplePageCurrentData.trending.results[0]
				.profile_path
		} else if (props.forUrl === 'tvShows') {
			return state.dataFromAPI.tvShowsPageCurrentData.trending.results[0]
				.backdrop_path
		}
	})

	// JSX
	return (
		<NavLink to={`/${props.forUrl}/`}>
			<div className={styles.body}>
				<img
					src={`https://image.tmdb.org/t/p/w500${bg_path}`}
					alt=""
					className={styles.bg}
				/>
				<div className={styles.title}>{props.title}</div>
			</div>
		</NavLink>
	)
}

// ====================================================
// Exports

export default React.memo(Card)
