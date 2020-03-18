const Level = require('../models/level');

exports.getLevel = async function(req, res, next) {
    const id = req.body.id ? req.body.id : req.params.id
    try {
        level = await Level.findById(id)
        if (level == null) {
            return res.status(404).json({ 
                success: false,
                message: 'Level not found',
            })
      }
    }   catch(err){
            return res.status(500).json({ 
                success: false,
                message: err.message,
            })
    }
    res.level = level
    next()
}