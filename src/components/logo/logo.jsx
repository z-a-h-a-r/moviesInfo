// ====================================================
// IMPORTS
import React from 'react'
import styles from './logo.module.scss'

// ====================================================
// Component

const Logo = props => {
	// JSX
	return (
		<div
			className={
				props.displayNone ? [styles.media, styles.body].join(' ') : styles.body
			}
		>
			<span>span</span>
			<span>span</span>
			<span>span</span>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Logo)
