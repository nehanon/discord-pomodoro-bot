module.exports = {
	name: 'stop auto sprint',
	description: 'Clearing active automatic sprints',
	execute (message) {
		const autoStatus = require('../data/autoStatus')
		
		autoStatus.setInactive(message.guild.id)

		message.channel.send('Alright! No more sprints will be started.')
	}
}