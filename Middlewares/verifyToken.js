const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
 try{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.token;
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) req.status(401).json('invalid token');
            req.user = user;
            next();
        })        
    }
    else{
        res.status(401).json('You are not authenticated');
    }

 }catch(e){
    console.log(e.message);
    res.status(500).json('something went wrong')
 }

}

module.exports = verifyToken;