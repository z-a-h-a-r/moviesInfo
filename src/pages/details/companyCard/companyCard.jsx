// ====================================================
// IMPORTS
import React from 'react'
import styles from './companyCard.module.scss'

// ====================================================
// Component

const CompanyCard = props => {
	// JSX

	return (
		<div className={styles.body}>
			{props.logo_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w500${props.logo_path}`}
					alt=""
					className={styles.logo}
				/>
			) : (
				<div className={styles.withoutLogo}>Logo not found</div>
			)}

			<p className={styles.name}>{props.name}</p>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(CompanyCard)
