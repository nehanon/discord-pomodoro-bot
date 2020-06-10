const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token} = require('./config.json')

const client = new Discord.Client()
const setupDB = require('./config/database')
setupDB()

client.commands = new Discord.Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}
const emojiFinder = require('./support/emojiFinder')

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
	const autoStatus = require('./data/autoStatus')
	// const groupSprints = require('./data/activeSprinters')

	for (guild of client.guilds.cache) {
		autoStatus.addGuild(guild[0])
		// groupSprints.addGroupSprints(guild[0])
	}
})

client.on('message', message => {

	if (message.author.bot) return

	const messageContent = message.content.toLowerCase()
	if (messageContent.includes('ignore')){
        return
    } 

	if(messageContent.includes(prefix)) {
		const args = messageContent.replace(prefix, '')
		const command = client.commands.find(command => args.includes(command.name))
		
		if (!command) {
			const reactions = client.commands.get('reactions')
			
			const trigger = reactions.triggers.find(trigger => args.includes(trigger))
				
			if (trigger) reactions.execute(message, trigger) 
			else {
				const randomResponse = [`✨`, '⭐', '👀', '🦋', '🌸', '🌼']
				message.channel.send(randomResponse[Math.floor(Math.random() * randomResponse.length)])
			}
		} else {
			try {
				command.execute(message, args)
			} catch (error) {
				console.error(error, 'error')
				message.reply('Whoops I broke 😭')
			}
		}
		

	} else if (message.content.includes('comfy')) {
		message.react(emojiFinder(message, 'comfyknife'))
	} else if(message.content.toLowerCase().includes('yay')) {
		message.react(emojiFinder(message, 'blobcheer'))
	} else if(message.content === 'https://tenor.com/view/another-thor-chrishemsworth-gif-4736083' && message.channel.name === 'testing') {
		message.channel.send('Another!')
		const sprintCommand = client.commands.find(command => command.name === 'sprint')
		sprintCommand.execute(message, 'sprint')
	}

})

client.on('messageReactionAdd', (reaction, user) => {
	if (!reaction.message.author.bot || user.bot) return
	// console.log(user)
	console.log('reaction added')
	if (reaction.message.content.toLowerCase().includes('🔺') && reaction._emoji.name==='🔺') {
		
		const bump = require('./support/bump')
		
		const membersCheckedIn = reaction.message.content.slice(reaction.message.content.indexOf('are:') + 4)

		const find = membersCheckedIn.includes(` ${user.username},`) ? ` ${user.username},` : membersCheckedIn.includes(` ${user.username}.`) ? ` ${user.username}.` : ''

		console.log(find)
		
		if (find) {
			const newMembers = membersCheckedIn.replace(find, '')
			console.log(newMembers)
			bump(reaction, user, newMembers)
		}
	}
})
client.login(token)