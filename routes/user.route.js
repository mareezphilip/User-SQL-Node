const router = require("express").Router()
const db = require("../models")
const usercontroller = require("../app/controller/user.controller")
const {authUser} = require("../app/middleware/auth.middleware")



router.post("/adduser" , usercontroller.adduser)


router.get("/getuser/:id" , usercontroller.getsingleuser)

router.get("/getusers" ,  usercontroller.allusers)

router.patch("/edit"  , authUser , usercontroller.edit)

router.delete("/delete/:id"  , usercontroller.delete )

router.patch("/login" , usercontroller.login)

router.patch("/logout" , authUser ,usercontroller.logout)
module.exports =router