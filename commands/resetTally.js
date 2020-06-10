const Tally = require('../data/models/Tally')

module.exports = {
	name: 'reset tally',
	description: 'Focus sprints/Pomodoros',
	execute(message, args) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			Tally.findOne({member: message.member.id, guild: message.guild.id})
			.then(tally => {
				if (tally) {
					return tally.reset()
				} else {
					const data = {
						guild: message.guild.id,
						member: message.member.id,
						count: 0
					}
					const newTally = new Tally(data)
					newTally.save()
					return newTally
				}
			})
			.then(tally => {
				message.channel.send(`Done! Your sprint count is now ${tally.count}`)
			})
			.catch(err => {
				const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
				errorLog.send(`An error occurred - Tally reset error. Original message: \n ${message.content}`)
				console.log(err)
			})
		} else {
			message.channel.send('Uh oh! Ping an admin to do that.')
		}		
	}
}