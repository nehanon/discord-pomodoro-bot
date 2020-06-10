module.exports = {
	name: 'new report',
	description: 'Tell bot what you want to get done',
	async execute(message, args) {
		message.channel.send('You found a WIP feature 👀')
		// // sir bot new report - Get blah blah blah done
		// const workLog = message.guild.channels.cache.find(channel => channel.name === 'work-log')
		// const report = args.slice(args.indexOf('-') + 1).trim()
		// message.channel.send(`Alright! I've noted it down.`)
		// // workLog.send(`🎯 sprinter ${message.member.id} ${report}\n----`)
		// workLog.send(`progress sprinter ${message.member.id} ${report}`)
	}
}