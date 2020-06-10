const mongoose = require('mongoose')

const tallySchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now()
	},
	checkIn: {
		date: {
			type: Date,
			default: Date.now()
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

tallySchema.methods.addCount = function(count) {
	const tally = this
	if (count) {
		tally.count += count
	} else {
		tally.count += 1
	}

	return tally.save()
	.then(tally => {
		return Promise.resolve(tally)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

tallySchema.methods.reset = function(count) {
	const tally = this
	tally.count = 0

	return tally.save()
	.then(tally => {
		return Promise.resolve(tally)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

const Tally = mongoose.model('Tally', tallySchema)

module.exports = Tally