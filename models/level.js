const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
    name: String,
    description: String,
    access: Number,
    rights: String,
    status: Boolean,
    createdBy: Number,
    createdAt: {type: Date, default: Date.now},
}, {collection: 'theNorth'})

module.exports = mongoose.model('Level', levelSchema, 'Levels');