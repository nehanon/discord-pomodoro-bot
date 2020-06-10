module.exports = {
	name: 'no more pings',
	description: 'Remove the sprinting role',
	execute(message) {
		// modify for prod
		const sprinting = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'sprinting')

		!message.member._roles.includes(sprinting.id) 
		?
		message.channel.send(`You're not signed up for pings from sprinting right now!`)
		:
		message.member.roles.remove(sprinting).catch(console.error) && message.reply(`You are no longer signed up for sprinting pings. Good job!`)
	},
}