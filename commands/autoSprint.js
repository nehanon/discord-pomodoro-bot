const calculateDuration = require('../support/duration')

module.exports = {
	name: 'auto sprint',
	description: 'Sprints on an interval',
	execute(message, args) {
		const autoStatus = require('../data/autoStatus')
		const isActive = autoStatus.getStatus(message.guild.id) 
		// stops someone starting a new set of auto sprints while there's already one going on
		if (isActive) {
			message.channel.send('An auto sprint is already ongoing. You can wait for it to end before starting a new auto sprint, or stop the current one by using the command sir bot stop auto sprint')
		} else {
			const params = args.replace('auto sprint', '').trim().split(' ')
			const [duration, restString, number] = params
			
			if (duration && restString && number) {
	
				const rest = calculateDuration(params[1])
				autoStatus.setActive(message.guild.id)
				
				const sprintCommand = message.client.commands.get('sprint')
	
				const sprintSet = async(i) => {
					
					sprintCommand.execute(message, duration, {message: `Sprint ${i+1} of ${number}. Go go go! 🔥`});
					await new Promise(resolve => setTimeout(resolve, calculateDuration(duration) + 1000));
					
					
					((i < (number - 2)) && autoStatus.getStatus(message.guild.id)) ? message.channel.send(`The next sprint will start in ${Math.floor(rest/60000) ? Math.floor(rest/60000)+'m' : (rest/1000) + 's'}`) : ((i < (number - 1)) &&autoStatus.getStatus(message.guild.id)) ? message.channel.send(`The last sprint will start in ${Math.floor(rest/60000) ? Math.floor(rest/60000)+'m' : (rest/1000) + 's'}`) : message.channel.send(`Done sprinting!`);
	
					// no rest for final sprint:
					(i < (number - 1)) && await new Promise(resolve => setTimeout(resolve, rest));
					
					(i < (number - 2)) && autoStatus.getStatus(message.guild.id) && message.channel.send('The next sprint is starting now.');
					(i === (number - 2)) && autoStatus.getStatus(message.guild.id) && message.channel.send('The last sprint is starting now.');
					
					return Promise.resolve('iteration done');
				}
				let i = 0
				const sprintSyncLoop = async() => {
					while(i < number && autoStatus.getStatus(message.guild.id)) {
						await sprintSet(i)
						i++
					}
				}
	
				sprintSyncLoop()
	
			} else {
				message.channel.send("That's not the right syntax for that command. Please use:\n `sir bot <sprint duration> <rest duration> <number of sprints>`")
			}
		}
		
	}
}