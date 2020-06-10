const Guild = require('../models/Guild')

module.exports.checkIn = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			const activeSprinters = guild.activeSprinters.filter(sprinter => {
				return (sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()
			})

			const find = activeSprinters.find(sprinter => {
				return sprinter.memberId === data.memberId
			})
			
			if (find) {
				find.duration = data.duration
				find.username = data.username
				find.checkedInAt = Date.now()
				guild.activeSprinters = activeSprinters
			} else {
				const newSprinters = [...activeSprinters, data]
				guild.activeSprinters = newSprinters
			}


			const newGuild = await guild.save()
			return newGuild.activeSprinters

		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}

module.exports.checkOut = async(id, memberId) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try{
			const guild = await Guild.findOne({guildId: id})
			const activeSprinters = guild.activeSprinters.filter(sprinter => {
				return ((sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()) && sprinter.memberId !== memberId
			})

			guild.activeSprinters = activeSprinters

			const newGuild = await guild.save()
			return newGuild.activeSprinters

		} catch (err) {
			console.log(err)
			return null
		}
	}
}

module.exports.showCheckIns = async(id) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			const activeSprinters = guild.activeSprinters.filter(sprinter => {
				return (sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()
			})
			return activeSprinters
		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}