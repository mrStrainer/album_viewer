import * as actions from './index'
describe('todo actions', () => {
	it('requestAlbum should create REQUEST_ALBUM action', () => {
		expect(actions.requestAlbum('albumId')).toEqual({
			type:'REQUEST_ALBUM',
			albumId:'albumId'
		})
	})
})