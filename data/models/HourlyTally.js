const mongoose = require('mongoose')

const hourlyTallySchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
	savePoint: {
		date: {
			type: Date,
			default: Date.now
		},
		count: {
			type: Number,
			default: 0
		},
		goal: {
			type: Number,
			default: 0
		}
	},
	guild: {
		type: String
	},
	member: {
		type: String
	},
	count: {
		type: Number
	}
})

hourlyTallySchema.methods.addCount = function(count) {
	const hourlyTally = this
	hourlyTally.count += count
	
	return hourlyTally.save()
	.then(hourlyTally => {
		return Promise.resolve(hourlyTally)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

hourlyTallySchema.methods.reset = function(count) {
	const hourlyTally = this
	hourlyTally.count = 0

	return hourlyTally.save()
	.then(hourlyTally => {
		return Promise.resolve(hourlyTally)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

const HourlyTally = mongoose.model('HourlyTally', hourlyTallySchema)

module.exports = HourlyTally