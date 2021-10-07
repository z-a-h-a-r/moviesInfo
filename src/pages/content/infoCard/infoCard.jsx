// ====================================================
// IMPORTS
import styles from './infoCard.module.scss'

// ====================================================
// Component

const InfoCard = props => {
	// ====================================================
	// JSX

	return (
		<div className={styles.body}>
			<div className={styles.content}>
				{props.content} {props.children}
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default InfoCard
