const jwt = require("jsonwebtoken")
const db = require("../../models")
const {resGenerator} = require("../helper")

const authUser = async(req, res, next)=>{
    try{
        //bearer ey......
        const token = req.header("Authorization").replace("bearer ", "")
        const decoded = jwt.verify(token, process.env.jwtKey)
        const { id, name } = decoded;
        const userData = await db.User.findOne({where:{id:id , name:name}})
        if(!userData) throw new Error("unauthorized")
        req.user = userData
        req.token = token
        next()
    }
    catch(e){
        resGenerator(res, 500, false, e.message, "unauthorized")
    }
} 

module.exports = {authUser }