module.exports = {
	name: 'new focus',
	description: 'Tell bot what you want to get done',
	execute(message, args) {
		message.channel.send('You found a WIP feature 👀')
		// // sir bot sprint focus is - Get blah blah blah done
		// const workLog = message.guild.channels.cache.find(channel => channel.name === 'work-log')
		// const focus = args.slice(args.indexOf('-') + 1).trim()
		// message.channel.send(`Noted! Good luck, ${message.member.user.username}!`)
		// // workLog.send(`📜 Sprinter ${message.member.id} ${focus}`)
		// workLog.send(`focus Sprinter ${message.member.id} ${focus}`)
	}
}