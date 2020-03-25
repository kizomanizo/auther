const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    saltRounds: String,
    lastLogin: Date,
    status: Boolean,
    person: {
        firstname: String,
        middlename: String,
        lastname: String,
        phone: {
            code: String,
            prefix: String,
            suffix: Number
        },
    },
    joinDate: { type: Date, required: true },
    createdBy: Number,
    createdAt: {type: Date, default: Date('Y-m-d')},
    updatedAt: {type: Date, required: false, default: null},
    level_id: ObjectId,
}, {collection: 'theNorth'})

module.exports = mongoose.model('User', userSchema, 'Users');