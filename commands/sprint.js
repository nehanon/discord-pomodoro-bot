const calculateDuration = require('../support/duration')
const sprintFunction = require('../support/sprintFunction')
const autoStatus = require('../data/autoStatus')
const defaultTime = 1500000

module.exports = {
	name: 'sprint',
	description: 'Focus sprints/Pomodoros',
	execute(message, args, isAuto) {
		
		const isActive = autoStatus.getStatus(message.guild.id)
		console.log(isActive)
		// stops someone starting a single group sprint while auto is active
		if (isActive && !isAuto) message.channel.send(`An auto sprint is currently ongoing. If you'd like to start a new sprint, wait for auto sprints to end or cancel them with the command 'sir bot stop auto sprint'`)

		else {
			// modify for prod
			const sprinting = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'test sprints')
			try {
			const duration = calculateDuration(args, defaultTime)
			const data = {
				duration,
				guild: message.channel.guild.id,
				channel: message.channel.id
			}
	
			const options = {
				message, data, ping: sprinting, isAuto
			}
			sprintFunction(message, options)
	
			// sprintFunction(message, data, sprinting, duration, true, isAuto)
			} catch(err) {
				console.log(err)
				message.channel.send("⚠️ Uh oh! The duration of that sprint doesn't look right. Please make sure you don't use emojis or include any other numbers in the command!")
			}
		}
		
	}
}