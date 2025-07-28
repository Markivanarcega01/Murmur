const express = require("express")
const cors = require("cors")
const sequelize = require('./database/connect')
const app = express()
const http = require('http')
const server = http.createServer(app)
const authRouter = require("./routes/auth")
const protectedRouter = require("./routes/protected")
const { verify } = require("./middleware/verifyUser")
const  {Server} = require("socket.io")

const port = 3000
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
}
});

app.use(cors())
app.use(express.json())

io.on('connection',(socket)=>{
  console.log('client connected:' ,socket.id)
  
  socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})

app.use("/auth", authRouter)
//app.use("/api/v1", verify, protectedRouter)
app.use("/api/v1", protectedRouter)

const start = async()=>{
    try{
        await sequelize.authenticate();
        server.listen(port,()=>{
            console.log("Server listening")
        })
    }catch(error){
        console.log(error)
    }
}

start()