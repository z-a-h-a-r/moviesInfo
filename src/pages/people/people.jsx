// ====================================================
// IMPORTS
import styles from './people.module.scss'
import React from 'react'
import Search from '../../components/search/search'
import NoSearchData from '../../components/noSearchData/noSearchData'

// ====================================================
// Component

const People = props => {
	// JSX
	return (
		<div className={styles.body}>
			<h1 className={styles.title}>People</h1>
			<Search type={'people'} />
			<div style={{ marginTop: '150px' }}>
				<NoSearchData />
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(People)
