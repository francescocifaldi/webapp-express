const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const notFound = require('./middlewares/notFound')
const cors = require('cors')
const movieRouter = require('./routers/movieRouter')

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
)
app.use(express.static('public'))

app.get('/',(req,res) =>{
    res.send('OK')
})

app.use('/api/movies', movieRouter)

app.use(notFound)

app.listen(port, () => {
    console.log(`Server on port ${port}`)
})