// TODO: Configuration of my variables
const Level = require('../models/level');

// List all the levels in the database
exports.all = async function(_req, res) {
    try {
        const levels = await Level.find()
            res.status(200).json({
                success: true,
                message: levels,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

// Get specific level details from the database
exports.details = function(req, res) {
    res.json({
        success: true,
        message: res.level,
    })
}

// Creating new entries in the persistence mechanism
exports.create = async function (req, res) {
    // Storing the level object in the database.
    const level = new Level({
        name: req.body.name,
        descripton: req.body.description,
        access: req.body.access,
        rights: req.body.rights,
        status: 0,
        createdBy: 1,
        createdAt: Date(),
    })
    try {
        const newUser = await level.save()
        res.status(201).json({
            success: true,
            message: newUser,
        }), console.log(salt)
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

// Update specific level details
exports.update = async function (req, res) {
    if (req.body.name != null) {
        res.level.name = req.body.name
    }
    if (req.body.description != null) {
        res.level.description = req.body.description
    }
    if (req.body.access != null) {
        res.level.access = req.body.access
    }
    if (req.body.rights != null) {
        res.level.rights = req.body.rights
    }
    if (req.body.status != null) {
        res.level.status = req.body.status
    }
    try {
        const updatedLevel = await res.level.save()
        res.status(200).json({
            success: true,
            message: updatedLevel,
        })
    } catch {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

// Delete one level
exports.delete = async function (req, res) {
    try {
        await res.level.remove()
        res.status(200).json({ 
            success: true,
            message: 'Deleted This Level',
        })
    } catch(err) {
        res.status(500).json({
            success: true,
            message: err.message,
        })
    }
}