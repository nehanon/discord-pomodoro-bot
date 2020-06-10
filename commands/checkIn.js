const calculateDuration = require('../support/duration')
const guildsController = require('../data/controllers/guildsController')
const groupSprints = require('../data/activeSprinters')

module.exports = {
	name: 'check in',
	description: 'Tell the group how long you will be sprinting',
	async execute(message, args) {
		if (args.includes('list') || args.includes('show')) {
			const checkIns = await guildsController.showCheckIns(message.guild.id)
			message.channel.send(`There are ${checkIns.length} members checked in right now. \n${checkIns.map(member =>{
				const timeLeft = member.duration - (Date.now() - member.checkedInAt.getTime())
				const minuteTime = Math.floor(timeLeft/60000)
				return `${member.username} will be sprinting for another ${minuteTime === 0 ? timeLeft/1000 + 's' : minuteTime > 60 ? Math.round(minuteTime * 100/60)/100 + 'h' : minuteTime + 'm'}`
			}).join('\n')}`)
		} else {
			try {
				const duration = calculateDuration(args)
				if (duration > 14400000) {
					throw new Error('Duration too long')
				}
				const data = {
					memberId: message.member.id,
					username: message.member.user.username,
					duration
				}
				groupSprints.addMember(message.guild.id, message.member.id)
				const guild = await guildsController.checkIn(message.guild.id, data)
				const minuteTime = Math.floor(duration/60000)
				guild && message.channel.send(`You've been checked in for ${minuteTime === 0 ? duration/1000 + 's' : minuteTime > 60 ? Math.round(minuteTime * 100/60)/100 + 'h' : minuteTime + 'm'}. Don't forget to tell us what you'll be working on!`)
				!guild && message.channel.send('Whoops. The check in failed.')
			} catch(err) {
				console.log(err)
				message.channel.send('The duration for that command was either not specified or was too long. Please try again with a duration under 4 hours!')
			}
		}
	}
}