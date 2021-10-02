// ====================================================
// IMPORTS
// Main

import { getDetails, getTrending } from './getDataFromAPIReducer'

// ====================================================
// Types

const SET_INITIALIZED = 'SET_INITIALIZED'

// ====================================================
// Initial state

let initialState = {
	initialized: false,
}

// ====================================================
// Reducer

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

// ====================================================
// Action creators

export const initializeSuccess = payload => ({
	type: SET_INITIALIZED,
	payload,
})

// ====================================================
// Thunks

export const initializeApp = () => {
	return async dispatch => {
		new Promise((resolve, reject) => {
			dispatch(getTrending(resolve, 'movie'))
		})
			.then(() => {
				return new Promise((resolve, reject) => {
					dispatch(getTrending(resolve, 'tv'))
				})
			})
			.then(() => {
				return new Promise((resolve, reject) => {
					dispatch(getTrending(resolve, 'person'))
				})
			})
			.then(() => {
				return new Promise((resolve, reject) => {
					resolve(dispatch(initializeSuccess()))
				})
			})
	}
}

// ====================================================
// Exports

export default appReducer
