// ====================================================
// IMPORTS
import { API } from '../api/api'

// ====================================================
// Types

const SET_SERACH_DATA = 'SET_SERACH_DATA'
const SET_TRENDING_DATA = 'SET_TRENDING_DATA'
const SET_DETAILS_DATA = 'SET_DETAILS_DATA'

// ====================================================
// Initial state

let initialState = {
	moviesPageCurrentData: { search: {}, trending: {} },
	tvShowsPageCurrentData: { search: {}, trending: {} },
	peoplePageCurrentData: { search: {}, trending: {} },
	detailsPageCurrentData: {
		production_companies: [],
		genres: [],
		production_countries: [],
	},
}

// ====================================================
// Reducer

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SERACH_DATA: {
			if (action.payload.type === 'movie') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						moviesPageCurrentData: {
							...state.moviesPageCurrentData,
							search: {
								...action.payload.data,
								results: [
									...state.moviesPageCurrentData.search.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						moviesPageCurrentData: {
							...state.moviesPageCurrentData,
							search: action.payload.data,
						},
					}
				}
			} else if (action.payload.type === 'tv') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						tvShowsPageCurrentData: {
							...state.tvShowsPageCurrentData,
							search: {
								...action.payload.data,
								results: [
									...state.tvShowsPageCurrentData.search.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						tvShowsPageCurrentData: {
							...state.tvShowsPageCurrentData,
							search: { ...action.payload.data },
						},
					}
				}
			} else if (action.payload.type === 'person') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						peoplePageCurrentData: {
							...state.peoplePageCurrentData,
							search: {
								...action.payload.data,
								results: [
									...state.peoplePageCurrentData.search.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						peoplePageCurrentData: {
							...state.peoplePageCurrentData,
							search: action.payload.data,
						},
					}
				}
			}
		}

		case SET_TRENDING_DATA: {
			if (action.payload.type === 'movie') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						moviesPageCurrentData: {
							...state.moviesPageCurrentData,
							trending: {
								...action.payload.data,
								results: [
									...state.moviesPageCurrentData.trending.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						moviesPageCurrentData: {
							...state.moviesPageCurrentData,
							trending: { ...action.payload.data },
						},
					}
				}
			} else if (action.payload.type === 'tv') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						tvShowsPageCurrentData: {
							...state.tvShowsPageCurrentData,
							trending: {
								...action.payload.data,
								results: [
									...state.tvShowsPageCurrentData.trending.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						tvShowsPageCurrentData: {
							...state.tvShowsPageCurrentData,
							trending: { ...action.payload.data },
						},
					}
				}
			} else if (action.payload.type === 'person') {
				if (action.payload.isAdd === true) {
					return {
						...state,
						peoplePageCurrentData: {
							...state.peoplePageCurrentData,
							trending: {
								...action.payload.data,
								results: [
									...state.peoplePageCurrentData.trending.results,
									...action.payload.data.results,
								],
							},
						},
					}
				} else {
					return {
						...state,
						peoplePageCurrentData: {
							...state.peoplePageCurrentData,
							trending: action.payload.data,
						},
					}
				}
			} else {
				return state
			}
		}

		case SET_DETAILS_DATA: {
			return {
				...state,
				detailsPageCurrentData: action.payload,
			}
		}

		default:
			return state
	}
}

// ====================================================
// Action creators

export const searchSuccess = payload => ({
	type: SET_SERACH_DATA,
	payload,
})
export const getTrendingSuccess = payload => ({
	type: SET_TRENDING_DATA,
	payload,
})
export const getDetailsSuccess = payload => ({
	type: SET_DETAILS_DATA,
	payload,
})

// ====================================================
// Thunks

export const search = (resolve, query, type, page, isAdd, year) => {
	return async dispatch => {
		API.search(query, type, page, year).then(data => {
			resolve
				? resolve(dispatch(searchSuccess({ data, type, isAdd })))
				: dispatch(searchSuccess({ data, type, isAdd }))
		})
	}
}

export const getPopular = (type, page, isAdd = false, resolve) => {
	return async dispatch => {
		API.getPopular(type, page).then(data => {
			resolve
				? resolve(dispatch(getTrendingSuccess({ data, type, isAdd })))
				: dispatch(getTrendingSuccess({ data, type, isAdd }))
		})
	}
}

export const getDetails = (type, id) => {
	return async dispatch => {
		API.getDetails(type, id).then(data => {
			dispatch(getDetailsSuccess(data))
		})
	}
}

// ====================================================
// Exports

export default dataReducer
