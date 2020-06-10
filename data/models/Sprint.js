const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
		expires: '1440m'
	},
	duration: {
		type: Number
	},
	guild: {
		type: String
	},
	channel: {
		type: String
	},
	isSolo: {
		type: Boolean,
		default: false
	},
	member: {
		type: String
	},
	endMessage: {
		type: String
	},
	logMessage: {
		type: String
	}
	// PS you can have a default like this:
	// expires: {
	// 	type: Date,
	// 	default: () => Date.now() + 150000
	// }
})


const Sprint = mongoose.model('Sprint', sprintSchema)

module.exports = Sprint