// ====================================================
// IMPORTS
import React from 'react'
import styles from './footer.module.scss'

// ====================================================
// Component

const Footer = () => {
	// JSX
	return (
		<div className={styles.footer}>
			<div className="container">
				<div className={styles.body}>
					<div className={[styles.techInfo, styles.column].join('')}>
						<p>Main</p>
						<ul>
							<li>
								<a
									href="https://github.com/z-a-h-a-r/moviesInfo"
									className="link"
									target="_blank"
								>
									Project Code
								</a>
							</li>
							<li>
								<a
									href="https://github.com/z-a-h-a-r"
									className="link"
									target="_blank"
								>
									My GitHub
								</a>
							</li>
						</ul>
					</div>
					<div className={[styles.apis, styles.column].join('')}>
						<p>API</p>
						<ul>
							<li>
								<a
									href="https://www.themoviedb.org/settings/api"
									className="link"
									target="_blank"
								>
									theMovieDb API
								</a>
							</li>
						</ul>
					</div>
					<div className={[styles.contacs, styles.column].join('')}>
						<p>Contacs</p>
						<ul>
							<li>usfuld@gmail.com</li>
							<li>
								<a
									target="_blank"
									href="https://t.me/z_a_h_a_r_74/"
									className="link"
								>
									telegram
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Footer)
