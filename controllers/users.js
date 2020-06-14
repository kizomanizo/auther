// TODO: Configuration of my variables
const User = require('../models/user');
const Level = require('../models/level');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const variables = require('../config/variables');
const ms = require('ms');
const tokenExpiry = new Date (Date.now() + ms(variables.expiration));

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
    try {
        res.status(200).json({
            success: true,
            message: res.user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
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
                tokenExpiry: null,
                status: 0,
                person: {
                    firstname: req.body.firstname,
                    middlename: req.body.middlename,
                    lastname: req.body.lastname,
                    phone:{
                        code: "+255",
                        prefix: prefix,
                        suffix: suffix,

                    },
                },
                joinDate: Date(joinDate),
                createdBy: 1,
                createdAt: Date(),
                level_id: level._id,
            })
            try {
                const newUser = await user.save()
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
                    expiresIn: variables.expiration, // it can be 1m, 2h, 60d, 1y, 6000(1 minute), etc.
                });
            res.user.tokenExpiry = tokenExpiry;
            res.user.lastLogin = Date();
            res.user.save();
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                expiry: tokenExpiry,
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
            password: user.password,
            userEmail: user.email,
        })
    }
}

// Update specific user details
exports.update = async function (req, res) {
    // Post the update datetime now
    res.user.updatedAt = Date()
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.status != null) {
        res.user.status = req.body.status
    }
    if (req.body.joinDate != null) {
        res.user.joinDate = req.body.joinDate
    }
    
    // Check if any prson name parameter is posted then update it
    if (req.body.firstname != null) {
        res.user.person.firstname = req.body.firstname
    }
    if (req.body.middlename != null) {
        res.user.person.middlename = req.body.middlename
    }
    if (req.body.lastname != null) {
        res.user.person.lastname = req.body.lastname
    }

    // Complicate phone number storage to the max
    if (req.body.phone != null) {
        var phone = req.body.phone;
        if (phone.substr(0,1)=='+') {
            var prefix = phone.substr(4,3)
            var suffix = phone.substr(7,6)
        } else {
            var prefix = phone.substr(1,3)
            var suffix = phone.substr(4,6)
        } 
        res.user.person.phone.code = "+255"
        res.user.person.phone.prefix = prefix
        res.user.person.phone.suffix = suffix
    }

    // Hash the posted pasword if sent and store its parameters
    if (req.body.password != null) {
        const saltRounds = 10;
        const plainPassword = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainPassword, salt);
        res.user.password = hash
        res.user.salt = salt
        res.user.saltRounds = saltRounds
        console.log(res.user.password)
    }

    if (req.body.level != null) {
        const level = await Level.findOne({name: req.body.level})
        res.user.level_id = level._id
    }

    try {
        const updatedUser = await res.user.save()
        res.status(200).json({
            success: true,
            message: updatedUser,
        })
    } catch {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

// Delete one user
exports.delete = async function (req, res) {
    try {
        await res.user.remove()
        res.status(200).json({ 
            success: true,
            message: 'User has been deleted',
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}