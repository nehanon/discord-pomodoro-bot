module.exports = {
	name: 'done',
	description: 'Remove yourself from checkins and sprinting role',
	async execute(message, args) {
		const checkOutCommand = message.client.commands.get('check out')
		const removeSprinting = message.client.commands.get('no more pings')
		checkOutCommand.execute(message)
		removeSprinting.execute(message)
	}
}