module.exports = {
	name: 'set goal',
	description: 'set a productive hour goal',
	async execute(message, args) {
		message.channel.send('Oooh, you found a WIP feature!')

		// sets tally.checkIn.count to current tally count, sets goal to specified goal. sets date to date of command
		// show goal progress shows you how many hours you've logged since then and how long its been since you set the goal
	}
}