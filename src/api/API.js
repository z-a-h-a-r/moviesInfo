// ====================================================
// IMPORTS
// Main
import axios from 'axios'

// ====================================================
// Instance

const api = {
	key: '489200d72d725e40d31af3e858e3f8f9',
	base: 'https://api.themoviedb.org/3',
}

// ====================================================
// Requests

export const API = {
	search: (query = null, type = '', page = null, year = null) => {
		return axios
			.get(
				`${api.base}/search/${type}?api_key=${api.key}&include_adult=false
				${query ? '&query=' + query : ''}
				${page ? '&page=' + page : ''}
				${year ? '&year=' + year : ''}`
			)
			.then(result => result.data)
	},
	getTrending: (type = '', time_window = 'day') => {
		return axios
			.get(`${api.base}/trending/${type}/${time_window}?api_key=${api.key}`)
			.then(result => result.data)
	},
	getDetails: (type = '', id = '') => {
		return axios
			.get(`${api.base}/${type}/${id}?api_key=${api.key}`)
			.then(result => result.data)
	},
	getPopular: (type = '', page) => {
		return axios
			.get(`${api.base}/${type}/popular?page=${page}&api_key=${api.key}`)
			.then(result => result.data)
	},
}
