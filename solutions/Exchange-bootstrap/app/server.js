const express = require('express')
const app = express()

app.use(express.static('client'))

// Default Home route
app.get('/', (req, res) => {
   res.sendFile( __dirname + "/client/" + "home.html" )
})

const server = app.listen(9191, () => {
   const host = server.address().address
   const port = server.address().port

   console.log('Server listening on port: ' + port)
})
