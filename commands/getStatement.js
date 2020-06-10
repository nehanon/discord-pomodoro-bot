const calculateDuration = require('../support/duration')

module.exports = {
	name: 'get report',
	description: 'Get an accountability report',
	async execute(message, args) {
		// const duration = calculateDuration(args, 43200000)
		// const workLog = message.guild.channels.cache.find(channel => channel.name === 'work-log')
		// const messageCollection = await workLog.messages.fetch()
		// let messages = Array.from(messageCollection)
		// let i = 0
		// while((Date.now() - messages[messages.length - 1][1].createdTimestamp) < duration && i<5 && messageCollection.size===50) {
			
		// 	const moreMessages = await workLog.messages.fetch({before: messages[messages.length - 1][1].id})
		// 	messages = [...messages, ...Array.from(moreMessages)]
		// 	i++
		// }
		// if (messages.length > 0) {
		// 	const focus = messages.filter(msg => msg[1].content.includes('focus') && msg[1].createdTimestamp > Date.now() - duration).map(msg => `🔸 ${msg[1].content.replace(`focus Sprinter ${message.member.id}`, '')}`).reverse()
		// 	const reports = messages.filter(msg => msg[1].content.includes('progress') && msg[1].createdTimestamp > Date.now() - duration).map(msg => `🔹 ${msg[1].content.replace(`progress sprinter ${message.member.id}`, '')}`).reverse()
		// 	console.log(focus, reports)
		// 	message.channel.send(`${focus.join('\n')}\n\n${reports.join('\n')}`)
		// } else {
		// 	message.channel.send('No report logs were found')
		// }
		message.channel.send(`What's this! You've found a WIP feature.`)
	}
}