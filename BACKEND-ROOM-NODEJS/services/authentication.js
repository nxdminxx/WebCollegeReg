require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        console.log('No token found.');
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,response)=>{
        if(err){
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403);
        }
        res.locals = response;
        console.log('Token verification successful. User:', res.locals);
        next()
    })
}

module.exports = { authenticateToken: authenticateToken }