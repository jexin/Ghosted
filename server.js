// setup dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));

// connect to mongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("Success!")
})

// require routes
const entriesRouter = require('./routes/entries')
const usersRouter = require('./routes/users')

app.use('/entries', entriesRouter)
app.use('/users', usersRouter)

//production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));   
    app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

//start server
app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})
