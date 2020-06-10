const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
	added: {
		type: Date,
		default: Date.now
	},
	guildId: {
		type: String
	},
	roleName: {
		type: String,
		default: 'sprinting'
	},
	defaultTime: {
		type: Number,
		default: 1500000
	},
	defaultRest: {
		type: Number,
		default: 300000
	},
	activeSprinters: [{
		checkedInAt: {
			type: Date,
			default: Date.now
		},
		memberId: {
			type: String,
			required: true
		},
		username: {
			type: String
		},
		duration: {
			type: Number,
			required: true
		}
	}],
	levels: [
		{
			level: {
				type: Number,
				required: true
			},
			role: {
				type: Number,
				required: true
			},
			sprintCount: {
				type: Number,
				required: true
			}
		}
	]
})


const Guild = mongoose.model('Guild', guildSchema)

module.exports = Guild