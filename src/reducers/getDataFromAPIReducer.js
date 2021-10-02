// ====================================================
// IMPORTS
// Main

import { API } from '../api/api'

// ====================================================
// Types

const SET_SERACH_DATA = 'SET_SERACH_DATA'
const SET_TRENDING_DATA = 'SET_TRENDING_DATA'
const SET_DETAILS_DATA = 'SET_DETAILS_DATA'

// ====================================================
// Initial state

let initialState = {
	moviesPageCurrentData: { pageType: 'movie', search: {}, trending: {} },
	tvShowsPageCurrentData: { pageType: 'tv', search: {}, trending: {} },
	peoplePageCurrentData: { pageType: 'people', search: {}, trending: {} },
	detailsPageCurrentData: {},
}

// ====================================================
// Reducer

const getDataFromAPIReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SERACH_DATA: {
			if (action.payload.type === 'movie') {
				return {
					...state,
					moviesPageCurrentData: {
						...state.moviesPageCurrentData,
						search: { ...action.payload.data },
					},
				}
			} else if (action.payload.type === 'tv') {
				return {
					...state,
					tvShowsPageCurrentData: {
						...state.tvShowsPageCurrentData,
						search: { ...action.payload.data },
					},
				}
			} else if (action.payload.type === 'person') {
				return {
					...state,
					peoplePageCurrentData: {
						...state.peoplePageCurrentData,
						search: action.payload.data,
					},
				}
			} else {
				return state
			}
		}

		case SET_TRENDING_DATA: {
			if (action.payload.type === 'movie') {
				return {
					...state,
					moviesPageCurrentData: {
						...state.moviesPageCurrentData,
						trending: { ...action.payload.data },
					},
				}
			} else if (action.payload.type === 'tv') {
				return {
					...state,
					tvShowsPageCurrentData: {
						...state.tvShowsPageCurrentData,
						trending: { ...action.payload.data },
					},
				}
			} else if (action.payload.type === 'person') {
				return {
					...state,
					peoplePageCurrentData: {
						...state.peoplePageCurrentData,
						trending: action.payload.data,
					},
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

export const search = (resolve, query, type, page, year) => {
	return async dispatch => {
		API.search(query, type, page, year).then(data => {
			resolve
				? resolve(dispatch(searchSuccess({ data, type })))
				: dispatch(searchSuccess({ data, type }))
		})
	}
}

export const getTrending = (resolve, type, time_window) => {
	return async dispatch => {
		API.getTrending(type, time_window).then(data => {
			resolve
				? resolve(dispatch(getTrendingSuccess({ data, type })))
				: dispatch(getTrendingSuccess({ data, type }))
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

export default getDataFromAPIReducer
