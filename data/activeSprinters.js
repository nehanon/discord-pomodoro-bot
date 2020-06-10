let groupSprints = []

module.exports.addGroupSprints= (guild) => {
	groupSprints.push({
		guild,
		members: []
	})
}

module.exports.addMember = (guild, member) => {
	const find = groupSprints.find(sprint => sprint.guild === guild)
	if (find && find.members.includes(member)) return {error: 'member already checked in'}
	else if (!find) return {error: 'no such guild'}
	else find.members.push(member)
}

module.exports.getGroupSprint = (guild) => {
	const sprint = groupSprints.find(gs => gs.guild === guild)
	return sprint
}

module.exports.removeGroupSprint = (guild) => {
	const groupSprint = groupSprints.find(gs => gs.guild === guild)
	const newSprints = groupSprints.filter(gs => gs.guild !== guild)
	groupSprints = newSprints
	return groupSprint
}

module.exports.setGroupSprint = (sprintData) => {
	const index = groupSprints.findIndex(sprint => sprint.guild === sprintData.guild)
	if (index >= 0) {
		groupSprints[index] = sprintData
	} else {
		groupSprints.push(sprintData)
	}
	return groupSprints
}

module.exports.sprints = groupSprints