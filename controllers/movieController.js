const connection = require('../data/db')

function index(req, res) {
    const sql = "SELECT * FROM movies"
    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })
        
        const countSql = "SELECT COUNT(*) AS total FROM movies"
        connection.query(countSql, (_, result) => {
            if (err) return res.status(500).json({ message: err.message })
            const total = result[0].total;
			
            res.json({ movies, total })
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