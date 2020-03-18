// TODO: Configuration of my variables
const User = require('../models/user');
const Level = require('../models/level');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const variables = require('../config/variables');

// List all the users in the database
exports.all = async function(_req, res) {
    try {
        const users = await User.find()
            res.status(200).json({
                success: true,
                message: users,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

// Get specific user details from the database
exports.details = function(req, res) {
    res.json({
        success: true,
        message: res.user,
    })
}

// Creating new entries in the persistence mechanism
exports.create = function(req, res) {
    const saltRounds = 11;
    const plainPassword = req.body.password;
    const joinDate = req.body.joinDate;
    const phone = req.body.phone;
        if (phone.substr(0,1)=='+') {
            var prefix = phone.substr(4,3)
            var suffix = phone.substr(7,6)
        } else {
            var prefix = phone.substr(1,3)
            var suffix = phone.substr(4,6)
        }
    // Generate salt, note the number of rounds to be saved later
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plainPassword, salt, async function(err, hash) {
            const level = await Level.findOne({name: req.body.level});
            // Storing the user object in the database.
            const user = new User({
                email: req.body.email,
                password: hash,
                salt: salt,
                saltRounds: saltRounds,
                lastLogin: null,
                status: 0,
                person: [{
                    firstname: req.body.firstname,
                    middlename: req.body.middlename,
                    lastname: req.body.lastname,
                    phone:[{
                        code: "+255",
                        prefix: prefix,
                        suffix: suffix,

                    }],
                }],
                joinDate: Date(joinDate),
                createdBy: 1,
                createdAt: Date(),
                level_id: level_id,
            })
            try {
                const newUser = level._id // await user.save()
                res.status(201).json({
                    success: true,
                    message: newUser,
                })
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: err.message,
                })
            }
        });
    });
}

// Login logic lies here
exports.login = async function(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            let token = jwt.sign({email: req.body.email},
                variables.secret, {
                    expiresIn: '60d' // it can be 1m, 2h, 1y, 6000(1 minute), etc.
                });
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            })
        }
    } catch(err) {
        res.status(401).send({
            success: false,
            message: err.message,
        })
    }
}
