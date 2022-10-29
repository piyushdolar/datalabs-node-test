const { Client } = require("pg")

// NOTE: Don't coding or edit anything in this function
module.exports = async ({
	transName,
	client = new Client()
}) => {
	const minsecFn = require('./min-sec')

	console.log(`[${minsecFn()}][${transName}][ACTION:group-ranking]`)

	const result = await client.query(`
    SELECT ranking, COUNT(ranking) num_of_ranking
    FROM point p
    LEFT JOIN point_ranking pr ON p.amount <@ pr."range"
    GROUP BY ranking
  `)
	const rowAffected = result.rowCount

	console.log(`[${minsecFn()}][${transName}][ACTION:group-ranking -> query-result] ${rowAffected} row${rowAffected > 1 ? 's' : ''} affected`)

	return result.rows.map((row) => ({
		ranking: row.ranking,
		num_of_ranking: row.num_of_ranking,
	}))
}
