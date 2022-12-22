const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');


const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user._id == req.params._id){
             next();
        }
        else res.status(403).json('You are not allowed to do that')        
    });

}

module.exports = verifyTokenAndAuthorization;