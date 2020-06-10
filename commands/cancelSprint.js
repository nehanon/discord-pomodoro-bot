module.exports = {
	name: 'stop solo sprint',
	description: 'stop an active solo sprint',
	async execute (message, args) {
		const timers = require('../data/timers')
		const sprintsController = require('../data/controllers/sprintsController')

		const timer = timers.getTimer(message.member.id)

		if (timer) {
			clearTimeout(timer)
			const deletedSprint = await sprintsController.destroy(timer.sprintId)
			if (!deletedSprint) {
				if (!deletedSprint) {
					const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
					errorLog.send('DB error while deleting sprint')
				}
			}
			message.channel.send('The solo sprint you started was stopped')
		} else {
			message.channel.send(`I couldn't find a solo sprint for you!`)
		}
	}
}