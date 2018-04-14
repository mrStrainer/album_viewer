import currentAlbum from './currentAlbum'

describe('currentAlbum reducer', () => {
	it('should deal with initial state', () => {
		expect(
			currentAlbum(undefined,{})
		).toEqual({
			isFetching:false,
		})
	})

	it('should handle REQUEST_ALBUM', () => {
		expect(
			currentAlbum(undefined, {
				type:'REQUEST_ALBUM'
			})
		).toEqual({
			isFetching:true
		})
	})


	const album = {
		name: 'name',
		id: 'id',
		artist:'artist',
		release_date:'release_date',
		tracks:[],
		image:{
			width:300,
			height:300,
			url:'url'
		}
	}

	it('should handle RECEIVE_ALBUM', () => {
		expect(
			currentAlbum({
				isFetching:true
			}, {
				type:'RECEIVE_ALBUM',
				album
			})
		).toEqual({
			isFetching:false,
			album: {
				name: 'name',
				id: 'id',
				artist:'artist',
				release_date:'release_date',
				tracks:[],
				image:{
					width:300,
					height:300,
					url:'url'
				}
			}
		})
	})
})