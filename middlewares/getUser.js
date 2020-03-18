const User = require('../models/user');

exports.getUser = async function(req, res, next) {
    const id = req.body.id ? req.body.id : req.params.id
    try {
        user = await User.findById(id)
        if (user == null) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found',
            })
      }
    }   catch(err){
            return res.status(500).json({ 
                success: false,
                message: err.message,
            })
    }
    res.user = user
    next()
}