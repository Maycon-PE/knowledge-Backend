const { authSecret } = require('../.env')
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = app => {
	const params = {
		secretOrKey: authSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	}

	const strategy = new Strategy(params, (payload, done) => {
		app.db('users')
			.where({ id: payload.id })
			.first()
			.then(user => done(null, user ? { bla: 'asdasd', ...payload } : false))
			.catch(err => done(err, false))
	})

	passport.use(strategy)

	return {
		authenticate: () => passport.authenticate('jwt', { session: false })
	}
}
