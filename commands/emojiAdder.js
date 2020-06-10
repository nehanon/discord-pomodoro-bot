module.exports = {
	name: 'emoji',
	description: 'emoji adder',
	execute(message, args) {
		if (message.content.toLowerCase().includes('add emoji')) {
			args = args.split(' ')
			
			const attachment = args.find(arg => arg.includes('http'))
			const name = args[args.findIndex(arg => arg === 'name') + 1]

			message.guild.available 
			&& 
			message.member.hasPermission('MANAGE_EMOJIS') 
			&&
			message.guild.emojis.create(attachment, name)
				.then(emoji => {
					message.reply(`Done! Added as :${emoji.name}:`)
				})
				.catch(error => {
					console.log(error)
					message.channel.send('whoops, something went wrong with that one')
					const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
					errorLog.send(`An error occurred - emoji adding error. Original message: \n ${message.content}`)
				})
		} else {
			return
		}
	}
}