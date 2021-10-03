// ====================================================
// IMPORTS
import styles from './tvShows.module.scss'
import React from 'react'
import Search from '../../components/search/search'
import NoSearchData from '../../components/noSearchData/noSearchData'

// ====================================================
// Component

const TvShows = props => {
	// JSX
	return (
		<div className={styles.body}>
			<h1 className={styles.title}>TV shows</h1>
			<Search type={'TV shows'} />
			<div style={{ marginTop: '150px' }}>
				<NoSearchData />
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(TvShows)
