const express = require('express')
const app = express()
const port = 3000
const notFound = require('./middlewares/notFound')

app.use(express.static('public'))

app.get('/',(req,res) =>{
    res.send('OK')
})

app.use(notFound)

app.listen(port, () => {
    console.log(`Server on port ${port}`)
})