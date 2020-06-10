module.exports = {
	name: 'ping me',
	description: 'get a ping',
	async execute(message, args) {
		const calculateDuration = require('../support/duration')
		if (args.includes('ping me in')) {
			try {
				const duration = calculateDuration(args)
				message.channel.send(`Ok! I'll ping you!`)
				setTimeout(() => {
					message.channel.send(`Here's the ping you asked for, ${message.member.toString()}`)
				}, duration)
			} catch(err) {
				console.log(err)
				message.channel.send("⚠️ Uh oh! The duration of that sprint doesn't look right. Please make sure you don't use emojis or include any other numbers in the command!")
			}
		} else if(args.includes('every') && args.includes('times')) {
			
			const numberOfPings = args.split(' ')[args.split(' ').findIndex(arg => arg === 'times') - 1]
			console.log(numberOfPings)
			if (numberOfPings > 3) {
				message.channel.send('You can only queue up 3 pings at a time')
			} else if(isNaN(numberOfPings)) {
				message.channel.send(`Uh oh! I didn't understand that. Use the syntax: sir bot ping me every <duration> <number> times. Make sure you write the duration first!`)
			} else {
				try {
					const duration = calculateDuration(args)
					message.channel.send(`Ok! I'll ping you ${numberOfPings} times!`)
					let i = 0
					
					setTimeout(function run() {
						message.channel.send(`Here's the ping you asked for, ${message.member.toString()}. This is ping ${i + 1}/${numberOfPings}.`)
						i++
						if (i < numberOfPings) {
							setTimeout(run, duration)
						}
					}, duration)
				} catch(err) {
					console.log(err)
					message.channel.send("⚠️ Uh oh! The duration of that sprint doesn't look right. Please make sure you don't use emojis or include any other numbers in the command!")
				}
			}
		} else {
			message.channel.send(`That's not the right way to use the ping me command! You can say 'ping me in <duration>' or 'ping me every <duration> <number> times'`)
		}
	}
}