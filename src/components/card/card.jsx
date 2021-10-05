// ====================================================
// IMPORTS
import styles from './card.module.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

// ====================================================
// Component

const Card = props => {
	// JSX
	return (
		<NavLink to={`/details?type=${props.type}&id=${props.id}`}>
			<div className={styles.body}>
				{props.imgUrl ? (
					<img
						src={`https://image.tmdb.org/t/p/w500${props.imgUrl}`}
						alt=""
						className={styles.poster}
					/>
				) : (
					<div className={styles.withoutPoster}>Post not found</div>
				)}
				<p className={styles.title}>{props.title}</p>
			</div>
		</NavLink>
	)
}

// ====================================================
// Exports

export default React.memo(Card)
