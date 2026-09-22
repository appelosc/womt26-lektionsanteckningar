const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    console.log("Authorization middleware")
    try{
        const authHeader = req.headers.authorization || ' '
        const token = authHeader.split(' ')[1]
        console.log("Token: ", token)

        const user = jwt.verify(token, process.env.JWT_SECRET)
        console.log("User: ", user.sub, "name: ", user.name)
        req.authUser = user
    }
    catch (error) {
        res.status(401).json({ 
            message: "Athorization failed",
            error: error.message 
        })
    }
    next()
}