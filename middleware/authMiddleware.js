const { verifyToken } = require("../services/helpers")


const authMiddleware = async(req,res,next)=>{
    try {
        const token =req.cookies

        if(!token['X_AS-TOKEN']) return res.status(400).send({message : 'Token missing'})
            console.log(token)
        
        const decoded = verifyToken(token['X_AS-TOKEN'])
        if(!decoded) return res.status(400).send({message : 'Invalidd request.'})
        req.user = decoded
        next()
    } 
    
    catch (error) {
        console.log(error)
    }
}

module.exports = {authMiddleware}