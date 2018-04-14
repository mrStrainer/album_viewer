const currentSearch = (state = {
	isFetching:false,
	results:[],
	total:0
}, action) => {
	switch (action.type) {
		case 'REQUEST_SEARCH':
			return {
				...state,
				isFetching:true,
			}
		case 'RECEIVE_SEARCH':
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
export default currentSearch;