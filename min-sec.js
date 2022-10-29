module.exports = () => {
	const now = new Date()
	return `${now.getMinutes()}:${now.getSeconds()}`
}
