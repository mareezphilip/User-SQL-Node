const db = require("../../models")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const  resGenerator = require("../helper")

class user {

  
    static adduser = async (req,res)=>{
        try{
    
         
           const password = await bcrypt.hash(req.body.password , 10 )
         

           const newuser = await db.User.create({...req.body , password})
           
           resGenerator(res, 200, true, newuser, "user added")
        }
        
        catch (error) 
        {
            console.error('Error creating user:', error);
            resGenerator(res, 500, false, e, "error in add")

        }
        
       
    }

    static getsingleuser = async (req, res)=>{
        try{
          const user = await db.User.findOne({where:{id:req.params.id}})
          resGenerator(res, 200, true, user, "data showed")
        }
        catch (error){
            console.error('error when getting user', error);
            resGenerator(res, 500, false, error, "error in show data")
        }
    }


    //pagination
    static allusers = async (req, res)=>{
        try{
          const limit = req.query.limit || 2 
          const page = req.query.page || 1
          const offset = (page - 1 ) * limit
          const users = await db.User.findAll({
            offset,
            limit,
          })
          resGenerator(res, 200, true, users, "data showed")

        }
        catch (error){
            console.error('error when getting user', error);
            resGenerator(res, 500, false, error, "error in show data")

        }
    }

    static edit = async (req, res)=>{
        try{
          const user = await db.User.update(req.body , {where:{id:req.params.id}})
         
          resGenerator(res, 200, true, user, "user updated successfully")
        }
        catch (error){
            console.error('error in update', error);
            resGenerator(res, 500, false, error, "error in update")

        }
    }
    
    static delete =async (req, res)=>{
        try{
          const user = await db.User.destroy({where:{id:req.params.id}})
        
          resGenerator(res, 200, true, user, "user deleted successfully")
        }
        catch (error){
            console.error('error in delete', error);
            resGenerator(res, 500, false, error, "error in delete")
        }
    }

    static login = async (req , res) =>{

      // res.send("ana hnaaa")
      const user = await db.User.findOne({where:{email:req.body.email}})
      // res.send(user)
      if(!user) {
        res.status.json(" Email not found")
      }
      else{
       const match = await bcrypt.compare(req.body.password , user.password)
       if (match) {
        let token = await jwt.sign({id:user.id , name:user.name} , process.env.jwtKey )
        const edituser = await db.User.update({...user , token} , {where:{id:user.id}})
        resGenerator(res, 200, true, token, "token Created")
       }
       else{
        resGenerator(res, 500, false, error, "email or password invalid")
       }
      }
    }
}
module.exports = user