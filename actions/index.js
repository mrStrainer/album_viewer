export const REQUEST_ALBUM = 'REQUEST_ALBUM'
export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const requestAlbum = albumId => ({
	type:REQUEST_ALBUM,
	albumId
});
export const requestSearch = albumId => ({
	type:REQUEST_SEARCH,
	searchQ
});
export const receiveAlbum = album => ({
	type:RECEIVE_ALBUM,
	album, 
});
export const receiveSearch = results => ({
	type:RECEIVE_ALBUM,
	results,
});
export const login = token => ({
	type: LOGIN,
	isLoggedIn:true,
	token
});
export const logout = () => ({
	type:LOGOUT
});

const json = response => response.json()

const status = response => {
	if (response.error) {
		const { status, message } = response.error;
		throw `${status}: ${message}`;
	}
	return response;
};

const albumResponse = album => ({
    name: album.name,
    id:album.id,
    artist:album.artists[0].name,
    release_date:album.release_date,
    tracks:album.tracks.items,
    image:album.images[1]
});
const searchResponse = results = {
	const { total, items:responseAlbums  } = results.albums;
	const albums = responseAlbums.map(album => ({
		name:album.name,
		artist:album.artists[0].name,
		id:album.id,
		image:album.images[2]
	}));

	return {
		total,
		albums
	}
}
const fetchAlbum = (albumId, token) => dispatch => {
	dispatch(requestAlbum(albumId));
 	return fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
			method: `GET`,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
		})
 		.then(json)
 		.then(status)
 		.then(albumResponse)
 		.then(album => dispatch(receiveAlbum(album)));
};
const searchAlbum = (searchQ, token) => dispatch => {
	return fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=15`, {
			method: `GET`,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
		})
		.then(json)
		.then(status)
		.then(searchResponse)
		.then(results => dispatch(receiveSearch(results)));
}

const shouldFetchAlbum = (state, albumId) => {
	const { album, isFetching } = state;

	if (isFetching || album.id === albumId) 
		return false;

	return true;
}

export const fetchAlbumIfNeeded = albumId => (dispatch, getState) => {
	if (shouldFetchAlbum(getState(), albumId)){
		return dispatch(fetchAlbum(albumId));
	}
}

