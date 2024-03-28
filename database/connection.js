const mysql = require("mysql")

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "",
    database: "users"
})
db.getConnection(()=>{
    console.log("database connect successfully")
})

module.exports = db