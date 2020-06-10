const Guild = require('../data/models/Guild')

module.exports = {
	name: 'set level',
	description: 'set levels for auto levelling',
	execute(message, args) {
		// prefix set level 1 page 0
		// prefix set level 2 squire 50
		// prefix set level 3 knight 150
		if (message.member.hasPermission('ADMINISTRATOR')) {
			const argArray = args.replace('set level', '').trim().split(' ')
		
			const level = argArray[0]
			const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === argArray[1])
			const sprintCount = argArray[2]
			
			if (!level || !role || !sprintCount) {
				message.channel.send('Whoops! Did you use the right syntax?\n`      prefix set level <levelNumber> <roleToAssign> <sprintCount>`')
			} else {
				Guild.findOne({guildId: message.guild.id})
				.then(guild => {
					const levelData = {
						level,
						role,
						sprintCount
					}
					if(guild) {
						const levels = [...guild.levels]
						
						const newLevels = levels.map(oldLevel=> {
							const newLevel = {
								level: oldLevel.level,
								role: oldLevel.role,
								sprintCount: oldLevel.sprintCount
							}
							
							if (newLevel.level == level) {
								return levelData
							} else {
								return newLevel
							}
						})
						!newLevels.find(checkLevel => checkLevel.level === level) && newLevels.push(levelData)
						guild.levels = newLevels
						
						return guild.save()
					} else {
						const guildData = {
							guildId: message.guild.id,
							levels: [levelData]
						}
						const guild = new Guild(guildData)
						return guild.save()
					}
				})
				.then(guild => {
					message.channel.send('Done!')
				})
				.catch(err => {
					console.log(err)
					message.channel.send('Guild query/save error')
					const errorLog = message.guild.channels.cache.find(channel => channel.name === 'error-log')
					errorLog.send(`An error occurred - set levels(guild). Original message: \n ${message.content}`)
				})
			}
		} else {
			message.channel.send(`Whoops! You can't set levels.`)
		}
		
	}
}