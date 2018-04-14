import login from './login'

describe('login reducer', () => {
	it('should deal with initial state', () => {
		expect(
			login(undefined,{})
		).toEqual({
			isLoggedIn:false
		})
	})

	it('should handle login', () => {
		expect(
			login(undefined,{
				type:'LOGIN',
				token:'token'
			})
		).toEqual({
			isLoggedIn:true,
			token:'token'
		})

		expect(
			login({
				isLoggedIn:true,
				token:'token'
			}, {
				type:'LOGIN',
				token:'token2'
			})
		).toEqual({
			isLoggedIn:true,
			token:'token2'
		})
	})

	it('should handle logout', () => {
		expect(
			login(undefined,{
				type:'LOGOUT'
			})
		).toEqual({
			isLoggedIn:false
		})

		expect(
			login({
				isLoggedIn:true,
				token:'token'
			},{
				type:'LOGOUT'
			})
		).toEqual({
			isLoggedIn:false,
			token:'token'
		})

	})

})