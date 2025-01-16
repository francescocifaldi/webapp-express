const connection = require('../data/db')

function index(req, res) {
	const resPerPage = 2
	const currentPage = 0+1
	const offset = currentPage*resPerPage
    const sql = `SELECT * FROM movies LIMIT ${resPerPage} OFFSET ${offset}`
    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })
        
        const countSql = `SELECT COUNT(*) AS totalResults FROM movies`
        connection.query(countSql, (_, result) => {
            if (err) return res.status(500).json({ message: err.message })
            const totalResults = result[0].totalResults;
			const totalPages =  Math.ceil(totalResults / resPerPage);
            res.json({ movies, totalResults, totalPages })
        })
    })
}


function show(req, res) {
    const id = req.params.id
	const sql = `SELECT * FROM movies WHERE id = ?`

	connection.query(sql, [id], (err, results) => {
		if (err) return res.status(500).json({ message: err.message })
		if (results.length === 0)
			return res.status(404).json({
				error: 'Not Found',
				message: 'movie not found',
			})

		const movie = results[0]

		const sql = `SELECT * FROM reviews WHERE movie_id = ?`

		connection.query(sql, [id], (err, results) => {
			if (err) return res.status(500).json({ message: err.message })

			movie.reviews = results
			// BONUS: aggiungere il voto medio delle recensioni
			res.json(movie)
		})
	})
}

module.exports = { index, show }