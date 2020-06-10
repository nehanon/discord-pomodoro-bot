const calculateDuration = require('./duration')
const HourlyTally = require('../data/models/HourlyTally')

const bump = async(reaction, user, newMembers) => {
	const start = reaction.message.content.indexOf('was') + 3
	const end = reaction.message.content.indexOf('\n') - 1
	const duration = calculateDuration(reaction.message.content.slice(start, end))

	const members = reaction.message.content.slice(reaction.message.content.indexOf('are:') + 4)
	console.log(members)
	let newContent = reaction.message.content.replace(members, newMembers).trim()
	console.log(newContent)
	if (newContent[newContent.length - 1] === ',') {
		newContent = newContent.slice(0, newContent.length - 1) + '.'
	}

	await reaction.message.edit(newContent)
	reaction.message.channel.send(`${user.username} just bumped their tally.`)

}


module.exports = bump