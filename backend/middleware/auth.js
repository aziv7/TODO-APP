const jwt =require('jsonwebtoken') 
const User =require('../models/user.js') 

const guard = async (req, res, next) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET)
       
        req.user = await User.findById(decoded.id)
        next()
      } catch (err) {
        res.status(401).json({message:'Not authorized'})
        
      }
    }
    if (!token) {
        res.status(401).json({message:'Not authorized'})
    }
  }
  
  module.exports=guard