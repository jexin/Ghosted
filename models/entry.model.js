const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    company: {type: String, required: true},
    status: {type: String},
    notes: {type: String},
}, {
    timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry