const groupSprints = require('../data/activeSprinters')

module.exports = {
	name: 'time left',
	description: 'See time left in a group sprint',
	async execute(message, args) {
		const sprint = groupSprints.getGroupSprint(message.guild.id)
		const timeLeft = sprint.duration - (Date.now() - sprint.createdAt)
		const timeString = timeLeft > 3600000 ? Math.round(timeLeft/3600000*100)/100 + 'h': timeLeft > 60000 ? Math.floor(timeLeft/60000) + 'm' : timeLeft/1000 + 's'
		message.channel.send(timeString)
	}
}