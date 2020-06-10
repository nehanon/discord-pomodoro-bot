module.exports = {
	name: 'stop sprint',
	description: 'stop active group sprint',
	async execute(message, args) {
		const groupSprints = require('../data/activeSprinters')
		const timers = require('../data/timers')
		const sprintsController = require('../data/controllers/sprintsController')

		// get data on active group sprint
		const activeSprint = groupSprints.getGroupSprint(message.guild.id)
		let timer = {}
		if (activeSprint) timer = timers.getTimer(activeSprint.id)

		if (!activeSprint || !timer) {
			message.channel.send(`Uh oh! I wasn't able to stop the sprint. Ping my creator please!`)
		} else {
			// cancel sprint, remove timer and active sprint
			clearTimeout(timer)
			timers.removeTimer(timer.id)
			groupSprints.removeGroupSprint(message.guild.id)

			// remove db entry
			const deletedSprint = await sprintsController.destroy(activeSprint.sprintId)
			// log errors
			if (!deletedSprint) {
				const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
				errorLog.send('DB error while deleting sprint')
			}

			message.channel.send('Active group sprint has been stopped!')
		}
	}
}