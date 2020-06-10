const mongoose = require('mongoose')

const {connectionURI} = require('../config.json')

const setupDB = () => {
	mongoose.connect(connectionURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('connected to db')
	})
	.catch(err => {
		console.log('DB connection error', err)
	})
}

// const connection = setupDB()

module.exports = setupDB