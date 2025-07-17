const express = require("express")
const cors = require("cors")
const sequelize = require('./database/connect')
const app = express()
const authRouter = require("./routes/auth")
const protectedRouter = require("./routes/protected")

const port = 3000

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)
app.use("/api/v1", protectedRouter)

const start = async()=>{
    try{
        await sequelize.authenticate();
        app.listen(port,()=>{
            console.log("Server listening")
        })
    }catch(error){
        console.log(error)
    }
}

start()