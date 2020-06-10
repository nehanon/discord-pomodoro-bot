const autoStatus = {}

module.exports.getStatus = (guild) => {
	return autoStatus[guild]
}

module.exports.addGuild = (guild) => {
	autoStatus[guild] = false
}

module.exports.setInactive = (guild) => {
	autoStatus[guild] = false
	return autoStatus[guild]
}

module.exports.setActive = (guild) => {
	autoStatus[guild] = true
	return autoStatus[guild]
}

module.exports.status = autoStatus