const express = require('express')
const middleware = require('./middlewares')
const routes = require('./routes')
const createError = require('http-errors')
const cors = require('cors')


const app = express();
// Enable cors for all routes
app.use(cors())
process.on('unhandledRejection', (reason) => {
    process.exit(1)
})
middleware(app)
routes(app)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode).json({
        status: false,
        message: error.message
    })
})
module.exports = app