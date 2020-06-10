module.exports = {
	name: 'clear sprinting',
	description: 'Remove all members from sprinting',
	execute(message) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			const sprinting = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'sprinting')

			const membersSprinting = message.guild.members.cache.filter(member => member._roles.join(' ').includes(sprinting.id))
	
			membersSprinting.forEach(member => {
				member.roles.remove(sprinting).catch(console.error)
			})
	
			message.channel.send(`Sprinting has been cleared. Good job, everyone!`)
		} else {
			message.channel.send('Whoops! Ping an admin to run that command')
		}	
	},
}