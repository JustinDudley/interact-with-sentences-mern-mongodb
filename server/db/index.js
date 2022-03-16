const mongoose = require('mongoose')

mongoose
    .connect(process.env.TABLEAUS_EMBEDDED_DB_URI, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error yo', e.message)
    })

const db = mongoose.connection

module.exports = db
