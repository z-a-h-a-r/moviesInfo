// ====================================================
// IMPORTS
import styles from './header.module.scss'
import Logo from '../logo/logo'
import React from 'react'
import { NavLink } from 'react-router-dom'

// ====================================================
// Component

const Header = () => {
	// JSX
	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.inner}>
					<Logo displayNone={true} />

					<ul className={styles.menu}>
						<NavLink to={'/movies'} className="link">
							movies
						</NavLink>
						<NavLink to={'/tvShows'} className="link">
							tv shows
						</NavLink>
						<NavLink to={'/people'} className="link">
							people
						</NavLink>
					</ul>
				</div>
			</div>
		</header>
	)
}

// ====================================================
// Exports

export default React.memo(Header)
