const Member = require('../data/models/Member')
const Tally = require('../data/models/Tally')
const Guild = require('../data/models/Guild')

module.exports = {
	name: 'bump',
	description: 'Focus sprints/Pomodoros',
	execute(message, args) {
		if (args.includes('solo bump')) {
			Member.findOne({memberId: message.member.id, guildId: message.guild.id})
			.then(member => {
				if (member) return member.addCount()
				else {
					const data = {
						memberId: message.member.id,
						guildId: message.guild.id,
						tally: 1
					}
					const member = new Member(data)
					return member.save()
				}
			})
			.then(member => {
				message.channel.send(`⭐ Good job ${message.member.toString()}! Your sprint count is now ${member.tally}. Don't forget to share what you accomplished in this sprint! ⭐`)
			})
			.catch(err => {
				const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
				errorLog.send(`An error occurred - solo bump error. Original message: \n ${message.content}`)
				console.log(err)
			})
		} else {
			Tally.findOne({member: message.member.id, guild: message.guild.id})
			.then(tally => {
				if (tally) {
					return tally.addCount()
				} else {
					const data = {
						guild: message.guild.id,
						member: message.member.id,
						count: 1
					}
					const newTally = new Tally(data)
					return newTally.save()
				}
			})
			.then(tally => {
				message.channel.send(`⭐ Good job ${message.member.toString()}! Your sprint count is now ${tally.count}. Don't forget to share what you accomplished in this sprint! ⭐`)
				Guild.findOne({guildId: message.guild.id})
				.then(guild => {
					const levels = guild.levels
					levels.forEach(level => {
						if (level.sprintCount === tally.count) {
							const role = message.guild.roles.cache.find(role => role.id == level.role)
							message.member.roles.add(role)
							.then(() => {
								message.channel.send(`You are now level ${level.level} - ${role.name}`)
							})
						}
					})
				})
				const sprintLog = message.guild.channels.cache.find(channel => channel.name === 'sprint-log')
				sprintLog.send(`⭐ ${message.member.user.username} just bumped their tally! Good job, ${message.member.user.username}!`)
			})
			.catch(err => {
				const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
				errorLog.send(`An error occurred - bump error. Original message: \n ${message.content}`)
				console.log(err)
			})
		}
	}
}