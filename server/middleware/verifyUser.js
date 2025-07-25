const jwt = require('jsonwebtoken')

const verify = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error:"Missing Token"
        })
    }   

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({error: error})
    }
}

module.exports = {verify}