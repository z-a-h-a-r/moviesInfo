// ====================================================
// IMPORTS
import styles from './noSearchData.module.scss'
import React from 'react'
import Card from '../card/card'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ====================================================
// Component

const NoSearchData = props => {
	// ====================================================
	// state

	const moviesTrending = useSelector(
		state => state.dataFromAPI.moviesPageCurrentData.trending.results
	)
	const peopleTrending = useSelector(
		state => state.dataFromAPI.peoplePageCurrentData.trending.results
	)
	const tvShowsTrending = useSelector(
		state => state.dataFromAPI.tvShowsPageCurrentData.trending.results
	)

	// ====================================================
	// JSX
	return (
		<div className={styles.body}>
			<div className={styles.group}>
				<NavLink to={'/movies/'} className={styles.groupTitle}>
					Most popular movies
				</NavLink>
				<div className={styles.rowWrap}>
					{moviesTrending.map(item => {
						let index = moviesTrending.indexOf(item)

						if (index < 6) {
							return (
								<Card
									key={index}
									imgUrl={item.poster_path}
									title={item.title}
									type={'movies'}
									id={item.id}
								/>
							)
						} else {
							return false
						}
					})}
				</div>
			</div>

			<div className={styles.group}>
				<NavLink to={'/people/'} className={styles.groupTitle}>
					Most popular actors
				</NavLink>
				<div className={styles.rowWrap}>
					{peopleTrending.map(item => {
						let index = peopleTrending.indexOf(item)

						if (index < 6) {
							return (
								<Card
									key={index}
									imgUrl={peopleTrending[index].profile_path}
									title={peopleTrending[index].name}
									type={'people'}
									id={item.id}
								/>
							)
						} else {
							return false
						}
					})}
				</div>
			</div>

			<div className={styles.group}>
				<NavLink to={'/tvShows/'} className={styles.groupTitle}>
					Most popular tv shows
				</NavLink>
				<div className={styles.rowWrap}>
					{tvShowsTrending.map(item => {
						let index = tvShowsTrending.indexOf(item)

						if (index < 6) {
							return (
								<Card
									key={index}
									imgUrl={tvShowsTrending[index].poster_path}
									title={tvShowsTrending[index].name}
									type={'tvShows'}
									id={item.id}
								/>
							)
						} else {
							return false
						}
					})}
				</div>
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(NoSearchData)
