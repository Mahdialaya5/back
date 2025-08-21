const IsAdmin=(req,res,next)=>{
    if (req.user.Role!=='admin') {
        return res.status(401).send({msg:'Unauthorized'})
    }
    next()
}
module.exports=IsAdmin