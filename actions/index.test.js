import * as actions from './index'

describe('album actions', () => {
	it('requestAlbum should create REQUEST_ALBUM action', () => {
		expect(actions.requestAlbum('albumId')).toEqual({
			type:'REQUEST_ALBUM',
			albumId:'albumId'
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

	it('receiveAlbum should create a RECEIVE_ALBUM action', () => {
		expect(actions.receiveAlbum(album)).toEqual({
			type: 'RECEIVE_ALBUM',
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

describe('search actions', () => {
	it('requestSearch should create REQUEST_SEARCH action', () => {
		expect(actions.requestAlbum('albumId')).toEqual({
			type:'REQUEST_ALBUM',
			albumId:'albumId'
		})
	})

	it('receiveSearch should create RECEIVE_SEARCH action', () => {
		expect(
			actions.receiveSearch({
				total:0,
				albums:[]
			})
		).toEqual({
			type:'RECEIVE_SEARCH',
			results: {
				total:0,
				albums:[]
			}
		})
	})
})	

describe('login actions', () => {

	it('login should create LOGIN action', () => {
		expect(actions.login('token')).toEqual({
			type:'LOGIN',
			token:'token'
		})
	})

	it('logout should create LOGOUT action', () => {
		expect(actions.logout()).toEqual({
			type:'LOGOUT'
		})
	})
})	