const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now()
	},
	memberId: {
		type: String
	},
	guildId: {
		type: String
	},
	tally: {
		type: Number,
		default: 0
	},
	typeTally: [
		{
			category: {
				type: String,
				required: true,
				enum: ['Reading', 'Studying', 'Exercise', 'Chores', 'Work', 'Hobbies']
			},
			count: {
				type: Number,
				default: 0
			}
		}
	],
	trackers: [
		{
			createdAt: {
				type: Date,
				default: Date.now()
			},
			tracking: {
				type: String,
				required: true
			},
			count: {
				type: Number,
				required: true
			},
			unit: {
				type: String,
				required: true
			}
		}
	]
})

memberSchema.methods.addCount = function(count) {
	const member = this

	if (count) {
		member.tally += count
	} else {
		member.tally += 1
	}

	return member.save()
	.then(member => {
		return Promise.resolve(member)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

memberSchema.methods.subtractCount = function(count) {
	const member = this

	if (count) {
		member.tally -= count
	} else {
		member.tally -= 1
	}

	return member.save()
	.then(member => {
		return Promise.resolve(member)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}


const Member = mongoose.model('Member', memberSchema)

module.exports = Member