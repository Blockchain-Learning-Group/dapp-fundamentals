/*
 Basic Express server.
 Minimal routing sufficient for client data retrieval.
 */

const express = require('express')
const app = express()
const etherUtils = require('./server/ether')

app.use(express.static('client'))

// Default Home route
app.get('/', (req, res) => {
   res.sendFile( __dirname + '/client/' + 'index.html' )
})

const server = app.listen(8081, () => {
   const host = server.address().address
   const port = server.address().port

   console.log('Server listening on port: ' + port)
})
