// ====================================================
// IMPORTS
import styles from './main.module.scss'
import React from 'react'
import NoSearchData from '../../components/noSearchData/noSearchData'
import Card from './card/card'

// ====================================================
// Component

const Main = props => {
	// ====================================================
	// JSX

	return (
		<div className={styles.body}>
			<div className={styles.cardWrapper}>
				<Card title={'Movies'} forUrl={'movies'} key={1} />
				<Card title={'People'} forUrl={'people'} key={2} />
				<Card title={'TV shows'} forUrl={'tvShows'} key={3} />
			</div>
			<NoSearchData />
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Main)
