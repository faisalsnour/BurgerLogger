const express = require('express')
const app = express()


const PORT = process.env.PORT || 3000

// const orm = require( './app/orm' )

// will share any static html files with the browser
app.use( express.static('html') )

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




app.listen(PORT, function() {
    console.log(`Serving content on http://localhost:${PORT}`)
})