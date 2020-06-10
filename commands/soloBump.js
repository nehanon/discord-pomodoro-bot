const Member = require('../data/models/Member')

module.exports = {
	name: 'solo bump',
	description: 'Member for solo sprints',
	execute(message, args) {
		Member.findOne({memberId: message.member.id, guildId: message.guild.id})
		.then(member => {
			member.addCount()
		})
		.then(member => {
			message.channel.send(`⭐ Good job ${message.member.toString()}! Your sprint count is now ${member.count}⭐`)
		})
		.catch(err => {
			console.log(err)
			const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
			errorLog.send(`An error occurred - solo bump find. Original message: \n ${message.content}`)
		})
	}
}