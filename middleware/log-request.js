module.exports = (req,res,next) =>{
    console.log(`Remote IP: ${req.ip} - Method: ${req.method} - URL: ${req.url}`)
    next()
}