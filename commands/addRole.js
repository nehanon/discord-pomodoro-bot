module.exports = {
	name: 'add me to',
	description: 'Add the sprinting role',
	execute(message, args) {
		if (args.includes('sprinting')) {
			const sprinting = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'sprinting')

			message.member._roles.includes(sprinting.id) 
			?
			message.channel.send(`You've been added to sprinting and will be pinged!`)
			:
			message.member.roles.add(sprinting)
				.then(() => {
					message.reply(`You're been added to sprinting!`)
				})
				.catch(console.error)
		} else if (args.includes('ping me')) {
			const pingme = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'ping me')

			message.member._roles.includes(pingme.id) 
			?
			message.channel.send(`You're already signed up to be notified if someone would like to start a sprint!`)
			:
			message.member.roles.add(pingme)
				.then(() => {
					message.reply(`Alright! You'll be pinged when someone is looking for people to sprint with.`)
				})
				.catch(console.error)
		}
		
	},
}