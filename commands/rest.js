const calculateDuration = require('../support/duration')
const defaultRest = 3000


module.exports = {
	name: 'rest',
	description: 'Rests between sprints!',
	execute(message, args) {
		const duration = calculateDuration(args, defaultRest)
		setTimeout(() => {
			if (args.includes('ping')) {
				// modify for prod
				const sprinting = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'sprinting')
				message.channel.send('Back to work now! ' + sprinting.toString())
			} else {
				message.channel.send('Back to work now!')
			}
		}, duration)
		message.channel.send(`Rest for ${duration/1000/60}m!`)
	}
}