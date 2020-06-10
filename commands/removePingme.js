module.exports = {
	name: 'no more notifications',
	description: 'Remove the Ping Me role',
	execute(message) {
		// modify for prod
		const pingme = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'ping me')

		!message.member._roles.includes(pingme.id) 
		?
		message.channel.send(`You're not signed up for pings!`)
		:
		message.member.roles.remove(pingme).catch(console.error) && message.reply(`You are no longer signed up for pings`)
	},
}