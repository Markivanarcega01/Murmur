const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.get('/', (req,res)=>{
    res.status(200).send({message:"Hello World"})
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})