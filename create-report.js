const { Client } = require("pg")

// NOTE: Don't coding or edit anything in this function
module.exports = async ({
	transName,
	rankingData,
	client = new Client(),
}) => {
	const format = require('pg-format')
	const minsecFn = require('./min-sec')

	console.log(`[${minsecFn()}][${transName}][ACTION:create-report]`)

	const sql = format('INSERT INTO summary_point_ranking_hist_report (ranking, num_of_member) VALUES %L', rankingData.map((ranking) => Object.values(ranking)))

	const result = await client.query(sql)
	const rowAffected = result.rowCount

	console.log(`[${minsecFn()}][${transName}][ACTION:create-report -> query-result] ${rowAffected} row${rowAffected > 1 ? 's' : ''} affected`)
}
