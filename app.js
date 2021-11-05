const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet')
require('dotenv').config()
// Setup connect mongodb by mongoose
mongoose.connect('mongodb://127.0.0.1:27017/apiStarter', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected database from mongodb.'))
    .catch(() => console.error('Error to connect database'))

const app = express()
app.use(helmet())
const usersRoute = require('./routes/user')
const decksRoute = require('./routes/deck')
// Middlewares
app.use(logger('dev'))
app.use(express.json())

// Routes
app.use('/users', usersRoute)
app.use('/decks', decksRoute)

// Routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message : 'Server is OK'
    })
})

// Catch 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))
