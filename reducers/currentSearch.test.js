import currentSearch from './currentSearch'

describe('currentSearch reducer', () => {
	it('should deal with initial state', () => {
		expect(
			currentSearch(undefined,{})
		).toEqual({
			isFetching:false,
			results:[],
			total:0
		})
	})

	it('should handle REQUEST_SEARCH', () => {
		expect(
			currentSearch(undefined, {
				type:'REQUEST_SEARCH'
			})
		).toEqual({
			isFetching:true,
			results:[],
			total:0
		})
	})


	const results = {
		albums:[{}],
		total:1
	}

	it('should handle RECEIVE_SEARCH', () => {
		expect(
			currentSearch({
				isFetching:true
			}, {
				type:'RECEIVE_SEARCH',
				results
			})
		).toEqual({
			isFetching:false,
			results:[{}],
			total:1
		})
	})
})