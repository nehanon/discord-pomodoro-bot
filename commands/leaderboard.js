const Tally = require('../data/models/Tally')

module.exports = {
	name: 'leaderboard',
	description: 'Focus sprints/Pomodoros',
	execute(message, args) {
		Tally.find({guild: message.guild.id}).sort({count: -1}).limit(10)
		.then(tallies => {
			const data = tallies.map(tally => {
				const member = message.guild.members.cache.find(member => member.id === tally.member)
				
				return `${member.user.username} - ${tally.count}`
			})
			message.channel.send(data)
		})
		.catch(err => {
			console.log(err)
			const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
			errorLog.send(`An error occurred - leaderboard tally error. Original message: \n ${message.content}`)
		})
	}
}