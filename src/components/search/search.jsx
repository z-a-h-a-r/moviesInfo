// ====================================================
// IMPORTS
import styles from './search.module.scss'
import { Formik } from 'formik'
import search from '../../images/search.svg'

// ====================================================
// Component

const Search = props => {
	// ====================================================
	// JSX

	return (
		<div>
			<Formik
				initialValues={{ query: '' }}
				validate={values => {
					const errors = {}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					props.callback(values)
					setSubmitting(false)
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<>
						<form onSubmit={handleSubmit} className={styles.form}>
							<input
								className={styles.input}
								type="text"
								name="query"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								placeholder={`Search ${props.type}`}
								className={styles.input}
								autocomplete="off"
							/>

							<button
								disabled={isSubmitting}
								className={styles.button}
								type="submit"
								className={styles.button}
							>
								<img src={search} alt="" />
							</button>
						</form>
					</>
				)}
			</Formik>
		</div>
	)
}

// ====================================================
// Exports

export default Search
