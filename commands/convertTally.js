// const Tally = require('../data/models/Tally')
// const HourlyTally = require('../data/models/HourTally')

// const convert = async() => {
// 	const tallies = await Tally.find()
// 	for (let tally of tallies) {
// 		console.log(tally)
// 		const data = {
// 			guild: tally.guild,
// 			member: tally.member,
// 			count: tally.count * 30
// 		}
// 		const hourlyTally = new HourlyTally(data)
// 		const newTally = await hourlyTally.save()
// 		console.log(newTally)
// 	}
// }

// // convert()