const calculateDuration = require('../support/duration')
const sprintFunction = require('../support/sprintFunction')
const defaultTime = 1500000

module.exports = {
	name: 'solo sprint',
	description: 'Focus sprints/Pomodoros',
	execute(message, args) {
		try {
		const duration = calculateDuration(args, defaultTime)
		const data = {
			duration,
			guild: message.channel.guild.id,
			channel: message.channel.id,
			isSolo: true,
			member: message.member.id
		};

		const options = {
			message, data, ping: message.member.toString(), duration
		}

		sprintFunction(message, options)
		
		// sprintFunction(message, data, message.member.toString(), duration)
		} catch(err) {
			message.channel.send("⚠️ Uh oh! The duration of that sprint doesn't look right. Please make sure you don't use emojis or include any other numbers in the command!")
		}
	}
}