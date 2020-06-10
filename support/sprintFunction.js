const sprintsController = require('../data/controllers/sprintsController')
const guildsController = require('../data/controllers/guildsController')
const autoStatus = require('../data/autoStatus')

// options = {message, data, ping, isAuto}

const sprintFunction = async(message, options) => {
	const timers = require('../data/timers')
	const groupSprints = require('../data/activeSprinters')

	const isGroup = options.data.isSolo ? false : true
	const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
	const sprintLog = message.guild.channels.cache.find(channel => channel.name === 'test-sprint-log')

	// const activeTimer = timers.(message.guild.id)
	const groupSprint = groupSprints.getGroupSprint(message.guild.id)

	// one group sprint per guild
	if (groupSprint && isGroup) {

		const timeLeft = groupSprint.duration - (Date.now() - groupSprint.createdAt)

		message.channel.send(`There is already an ongoing group sprint! You can add yourself to sprinting and start working to join in, or create a solo sprint.\n\nTime left: ${Math.round(timeLeft/60000)}m`)
	} else {
	// timer start/end behaviour for group/solo sprints
		const sprint = await sprintsController.create(options.data)

		// make a list of checked in members
		let checkedInMembers = []

		const timer = setTimeout(() => {
			// remove timer
			timers.removeTimer(message.id);
			const deletedGroupSprint = groupSprints.removeGroupSprint(message.guild.id);
			
			(async() => {
				const duration = options.data.duration
				if (deletedGroupSprint) {
					const memberCache = message.guild.members.cache
					console.log(checkedInMembers, 'in timer')

					deletedGroupSprint.members.forEach(member => {
						memberName = memberCache.get(member).user.username
						console.log(memberName)
						if (!checkedInMembers.includes(memberName)) {
							checkedInMembers.push(memberCache.get(member).user.username)
						}
					})
				}
				console.log(checkedInMembers)

				// functions for sending message in sprint channel and deleting sprint
				const sendEndMessage = message.channel.send((`Time's up! ${options.ping} That was ${Math.floor(duration/60000) === 0 ? duration/1000 + 's' : Math.floor(duration/60000) + 'm'}!${isGroup ? `\n\nIf you were focused for most of the sprint, you can bump your tally by reacting with 🔺!` : ''}${checkedInMembers[0] ? `\n\nMembers who can bump are: ${checkedInMembers.join(', ')}`: ''}.`));
				
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
			})();
		}, options.data.duration)

		// refactor to use this instead of modifying the actual timer object
		// const timerData = {
		// 	timer,
		// 	id: message.id,
		// 	guild: message.guild.id
		// }
		
		timer.guild = message.guild.id
		if (sprint && !isGroup) timer.sprintId = sprint._id
		if (!isGroup) timer.id = message.member.id
		else timer.id = message.id
		timers.addTimer(timer);

		if (isGroup) {
			(async () => {
				try {
					const checkins = await guildsController.showCheckIns(message.guild.id)
					const members = checkins.filter(checkin => checkin.duration > options.data.duration/2).map(checkin => checkin.memberId)
					const sprintData = {
						guild: message.guild.id,
						members,
						duration: options.data.duration,
						createdAt: Date.now(),
						id: message.id,
						sprintId: sprint ? sprint._id : null
					}
					groupSprints.setGroupSprint(sprintData)

					const memberCache = message.guild.members.cache
					checkedInMembers = sprintData.members.map(member => {
						return memberCache.get(member).user.username
					}) 
					console.log(checkedInMembers, 'in isgroup')
					
					sprintLog.send(`🔥 A new group sprint for ${Math.floor(options.data.duration/60000) === 0 ? options.data.duration/1000 + 's' : Math.floor(options.data.duration/60000) + 'm'} has started in ${message.channel.toString()}! Happy sprinting everyone!`)
				} catch (err) {
					console.log(err)
				}
			})();
		}

		options.isAuto ? message.channel.send(options.isAuto.message + ` ${options.ping}`) : message.channel.send(`Sprinting for ${Math.floor(options.data.duration/60000) === 0 ? options.data.duration/1000 + 's' : Math.floor(options.data.duration/60000) + 'm'}. Go go go! 🔥 \n\nPlease share what you're planning to focus on during this sprint if you haven't already! \n\n ${options.ping}`)

		!sprint && errorLog.send('Database error while creating sprint')
	}
}

module.exports = sprintFunction