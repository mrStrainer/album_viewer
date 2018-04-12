import { combineReducers } from 'redux'

import {
	REQUEST_ALBUM,
	REQUEST_SEARCH,
	RECEIVE_ALBUM,
	RECEIVE_SEARCH,
	LOGIN,
	LOGOUT
} from '../actions';

const currentAlbum = (state = {
	isFetching: false,
	album:{}
}, action) => {
	switch (action.type) {
		case REQUEST_ALBUM:
			return {
				...state,
				isFetching:true
			}
		case RECEIVE_ALBUM:
			return {
				...state,
				isFetching:false
				album:action.album
			}
		default:
			return state;
	}
}

const currentSearch = (state = {
	isFetching:false,
	results:[],
	total:0
}, action) => {
	switch (action.type) {
		case REQUEST_SEARCH:
			return {
				...state,
				isFetching:true,
			}
		case RECEIVE_SEARCH:
			return {
				...state,
				isFetching:false,
				results:action.results.albums,
				total:action.results.total
			}
		default:
			return state;
	}
}

const login = (state ={
	isLoggedIn:false
}, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isLoggedIn:true,
				token:action.token,
			}
		case LOGOUT:
			return {
				...state,
				isLoggedIn:false
			}
		default:
			return state;
	}
}