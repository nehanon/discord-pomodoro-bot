// const sprintsController = require('../data/controllers/sprintsController')

module.exports = {
	name: 'show pins',
	description: 'See pinned messages',
	execute(message, args) {
		message.channel.messages.fetchPinned()
			.then(messages => {
				let reply = []
				for (let entry of messages) {
					reply.push(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${entry[1].id}\n${entry[1].author.username}\n${entry[1].content}\n`)
				}
				message.channel.send(reply)
			})
			.catch(err => {
				console.log(err)
				const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
				errorLog.send(`An error occurred - show pin error. Original message: \n ${message.content}`)
			})
	}
}