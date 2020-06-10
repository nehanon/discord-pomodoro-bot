module.exports = {
	name: 'good night',
	description: 'Sleep tracking',
	async execute(message, args) {
		message.channel.send('Good night! And stay tuned for sleep tracking features!')
		// goodnight ping: pings in half an hour to see if you've gone to bed
		// goodnight track: logs sleep time in member db and if you wish it good morning tells you it's been x time since you last said goodnight
	}
}