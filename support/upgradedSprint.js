const sprintsController = require('../data/controllers/sprintsController')
const guildsController = require('../data/controllers/guildsController')

// options = {message, data, ping, isAuto}

const sprintFunction = async(options) => {
	const timers = require('../data/timers')
	const groupSprints = require('../data/activeSprinters')

	const isGroup = options.data.isSolo ? false : true
	const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
	const sprintLog = message.guild.channels.cache.find(channel => channel.name === 'test-sprint-log')

	// const activeTimer = timers.getActiveTimer(message.guild.id)
	const groupSprint = groupSprints.getGroupSprint(message.guild.id)

	// one group sprint per guild
	if (groupSprint && isGroup) {

		const timeLeft = groupSprint.duration - (Date.now() - activeSprint.createdAt.getTime())

		message.channel.send(`There is already an ongoing group sprint! You can add yourself to sprinting and start working to join in, or create a solo sprint.\n\nTime left: ${Math.round(timeLeft/60000)}m`)
	} else {
	// timer start/end behaviour for group/solo sprints
		const sprint = await sprintsController.create(options.data)

		const timer = setTimeout((sprint) => {
			// remove timer
			timers.removeTimer(message.id);

			(async() => {
				const duration = options.data.duration
				// functions for sending message in sprint channel and deleting sprint
				const sendEndMessage = message.channel.send((`Time's up! ${options.ping} That was ${Math.floor(duration/60000) === 0 ? duration/1000 + 's' : Math.floor(duration/60000) + 'm'}!${isGroup && `\n\nIf you were focused for most of the sprint, bump your tally by reacting with 🔺!`}`));
				const endMessage = await sendEndMessage
				isGroup && endMessage.react('🔺')

				// if database entry created successfully, delete the sprint else log error
				if (sprint) {
					const deleteSprint = sprintsController.destroy(sprint._id)
					const deletedSprint = await deleteSprint
					!deletedSprint && errorLog.send('Database error while deleting sprint')
				} 

				// sprintLog entry with link
				if (isGroup) {
					sprintLog.send(`😌 The sprint for ${Math.floor(duration/60000) === 0 ? duration/1000 + 's' : Math.floor(duration/60000) + 'm'} has ended.\n\nYou can bump your tally for this sprint by reacting to this message\nhttps://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${endMessage.id}`)
				}
			});
		}, options.data.duration)

		// refactor to use this instead of modifying the actual timer object
		// const timerData = {
		// 	timer,
		// 	id: message.id,
		// 	guild: message.guild.id
		// }
		timer.id = message.id
		timer.guild = message.guild.id
		timers.addTimer(timer)

		if (isGroup) {
			const checkins = guildsController.showCheckIns(message.guild.id)
			const members = checkins.filter(checkin => checkin.duration > options.data.duration/2).map(checkin => checkin.memberId)
			const sprintData = {
				guild: message.guild.id,
				members,
				duration: options.data.duration
			}
			groupSprints.setGroupSprint(sprintData)
		}

		isAuto ? message.channel.send(isAuto.message + ` ${ping}`) : message.channel.send(`Sprinting for ${Math.floor(sprint.duration/60000) === 0 ? sprint.duration/1000 + 's' : Math.floor(sprint.duration/60000) + 'm'}. Go go go! 🔥 \n\nPlease share what you're planning to focus on during this sprint if you haven't already! \n\n ${ping}`)
		
		isGroup && sprint && sprintLog.send(`🔥 A new group sprint for ${Math.floor(sprint.duration/60000) === 0 ? sprint.duration/1000 + 's' : Math.floor(sprint.duration/60000) + 'm'} has started in ${message.channel.toString()}! Happy sprinting everyone!`)

		isGroup && !sprint && sprintLog.send(`🔥 A new group sprint for ${Math.floor(duration/60000) === 0 ? duration/1000 + 's' : Math.floor(duration/60000) + 'm'} has started in ${message.channel.toString()}! Happy sprinting everyone!`)

		!sprint && errorLog.send('Database error while deleting sprint')
	}
}