const currentAlbum = (state = {
	isFetching: false
}, action) => {
	switch (action.type) {
		case 'REQUEST_ALBUM':
			return {
				...state,
				isFetching:true
			}
		case 'RECEIVE_ALBUM':
			return {
				...state,
				isFetching:false,
				album:action.album
			}
		default:
			return state;
	}
}
export default currentAlbum;