const guildsController = require('../data/controllers/guildsController')

module.exports = {
	name: 'check out',
	description: 'remove yourself from the check in list',
	async execute(message) {
		
		const newSprinters = await guildsController.checkOut(message.guild.id, message.member.id)
		if (newSprinters) message.channel.send('You have been checked out!')
		else message.channel.send('Whoops, something went wrong')
	}
}