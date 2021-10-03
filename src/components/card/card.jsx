// ====================================================
// IMPORTS
import styles from './card.module.scss'
import React from 'react'

// ====================================================
// Component

const Card = props => {
	// JSX
	return (
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
	)
}

// ====================================================
// Exports

export default React.memo(Card)
