const { Client } = require('pg')
const minsecFn = require('./min-sec')

const clientT1 = new Client('postgresql://postgres:root@localhost:5432/eatlab_test')
const clientT2 = new Client('postgresql://postgres:root@localhost:5432/eatlab_test')

module.exports.main = async () => {
	await clientT1.connect()
	await clientT2.connect()

	const response = {}

	// Since can't edit no needs this function to be called.
	await cleanUp()

	// NOTE: Don't coding or edit anything in this function
	const usePointTrans1 = async (resolve) => {
		const usePoint = require('./use-point')
		const transName = 'usePointTrans1'
		const ms = 2000

		await delay({ transName, ms })

		await usePoint({
			memberId: 3,
			point: 5,
			transName,
			client: clientT1,
		})

		resolve(`Terminated: ${transName}`)
	}

	// NOTE: Don't coding or edit anything in this function
	const groupRankingTrans2 = async (resolve) => {
		const groupRanking = require('./group-ranking')
		const createReport = require('./create-report')
		const transName = 'groupRankingTrans2'
		const ms = 4000

		await pleaseCodingHereFn()

		let memberRankingRes = await groupRanking({ transName, client: clientT2 })

		await createReport({ rankingData: memberRankingRes, transName, client: clientT2 })

		await delay({ transName, ms })

		memberRankingRes = await groupRanking({ transName, client: clientT2 })
		Object.assign(response, memberRankingRes)

		resolve(`Terminated: ${transName}`)
	}

	const result = await Promise.all([new Promise(usePointTrans1), new Promise(groupRankingTrans2)])

	console.log(result)

	await clientT1.end()
	await clientT2.end()

	// NOTE: Don't coding or edit anything in this scope
	try {
		const assert = require('assert')
		assert.deepStrictEqual(Object.values(response), [
			{ ranking: 'diamond', num_of_ranking: '1' },
			{ ranking: 'gold', num_of_ranking: '1' },
			{ ranking: 'premium', num_of_ranking: '1' }
		])
	} catch (err) {
		console.error(err)
	}
}

// NOTE: Don't coding or edit anything in this function
const cleanUp = async () => {
	const { Client } = require('pg')
	const format = require('pg-format')

	const client = new Client('postgresql://postgres:root@localhost:5432/eatlab_test')
	await client.connect()

	await client.query('DELETE FROM point')
	await client.query('DELETE FROM summary_point_ranking_hist_report')
	await client.query(format('INSERT INTO point (member_id, amount) VALUES %L', [[1, 5], [2, 15], [3, 20]]))

	await client.end()
}

// NOTE: Don't coding or edit anything in this function
const delay = async ({ transName, ms }) => {
	const msg = `[${minsecFn()}][${transName}][ACTION:delay] time=${ms}ms`
	await new Promise((resolve) => {
		console.log(msg)
		setTimeout(() => resolve(msg), ms)
	})
}

// NOTE: solve this problem here
const pleaseCodingHereFn = async (resolve) => {
	const client = new Client('postgresql://postgres:root@localhost:5432/eatlab_test')
	await client.connect()
	await client.query('UPDATE point SET amount = 16 WHERE member_id = 2')
	await client.end()
}
