const jwt = require("jsonwebtoken")
const db = require("../../models")
const resGenerator = require("../helper")

const authUser = async(req, res, next)=>{
    try{
        
        const token = req.header("Authorization").replace("bearer ", "")
        const decoded = jwt.verify(token, process.env.jwtKey)
        const {id} = decoded;
        const userData = await db.User.findOne({where:{id:id }})
        // res.send(userData)
        if(!userData) throw new Error("unauthorized")
        req.user = userData
        console.log("user in auth " , req.user.id)
        req.token = token
        next()
    }
    catch(e){
        resGenerator(res, 500, false, e.message, "unauthorized")
    }
} 

module.exports = {authUser }