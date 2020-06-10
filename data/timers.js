let timers = []

// module.exports = timers

module.exports.resetTimer = () => {
	timers = []
	return timers
}

module.exports.addTimer = (timer) => {
	timers.push(timer)
	return timer
}

module.exports.removeTimer = (id) => {
	timers = timers.filter(timer => String(timer.id) !== String(id))
	return timers
}

module.exports.getTimers = () => {
	return timers
}

module.exports.getActiveTimer = (guildId) => {
	return timers.find(timer => timer.isGroup && timer.guild === guildId)
}

module.exports.getTimer = (id) => {
	return timers.find(timer => String(timer.id) === String(id))
}