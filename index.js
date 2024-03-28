require("dotenv").config()

// const db = require("./database/connection")
const app = require("./app/src")

const db = require("./models")
// 

db.sequelize.sync().then(()=>{
    app.listen(process.env.port, ()=> console.log(process.env.appURL))
})

