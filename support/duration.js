function calculateDuration(args, defaultTime) {
	let duration = ''
	let isNumber = false
	let lastIndex = 0
	if (args.length === 0) {
		throw new Error('Whoops, something went wrong!')
	}
	for (let i = 0; i < args.length; i++) {
		if ((!isNaN(args[i]) && args[i] !== ' ') || args[i] === '.') {
			duration = duration + args[i]
			isNumber = true
			lastIndex = i
		} else {
			isNumber = false
		}
		if (duration && !isNumber) {
			break;
		}
	}
	if(lastIndex || lastIndex === 0 && duration) {
		switch(args[lastIndex + 1]) {
			case 'm': {
				duration = duration * 60000
				break;
			}
			case 'h': {
				duration = duration * 60 * 60000
				break;
			}
			case 's': {
				duration = duration * 1000
				break;
			}
			default : {
				duration = duration * 60000
				break;
			}
		}
		if (duration > 43200000) {
			throw new Error('duration too long')
		}
	} else {
		if (!defaultTime) {
			throw new Error('No time specified')
		}
		duration = defaultTime
	}
	return duration
}

module.exports = calculateDuration