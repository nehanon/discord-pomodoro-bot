function emojiFinder(message, string) {
	if (message.client) {
		const emoji = message.client.emojis.cache.find(emoji => emoji.name === string)
		return emoji
	} else {
		return '?'
	}
	
}

module.exports = emojiFinder