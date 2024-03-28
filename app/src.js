const express = require("express")
var cors = require('cors')
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const userRoutes = require("../routes/user.route")

app.use("/users",userRoutes)

module.exports = app