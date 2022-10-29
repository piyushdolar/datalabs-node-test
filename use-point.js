const { Client } = require("pg")

// NOTE: Don't coding or edit anything in this function
module.exports = async ({
	memberId,
	point,
	transName,
	client = new Client(),
}) => {
	const minsecFn = require('./min-sec')

	console.log(`[${minsecFn()}][${transName}][ACTION:use-point] member_id=${memberId}, point=${point}`)

	const result = await client.query('UPDATE point SET amount = amount - $1 WHERE member_id = $2', [point, memberId])
	const rowAffected = result.rowCount

	console.log(`[${minsecFn()}][${transName}][ACTION:use-point -> query-result] ${rowAffected} row${rowAffected > 1 ? 's' : ''} affected`)
}
