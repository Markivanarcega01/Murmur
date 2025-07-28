import './App.css'
import { Routes, Route } from "react-router"
import Message from "./page/Message"
import Login from './page/Login'
import Registration from './page/Registration'
import {io} from 'socket.io-client'
import React from 'react'

function App() {

  const [time, setTime] = React.useState('fetching')  
  React.useEffect(()=>{
    const socket = io('http://localhost:3000')
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),3000)
    })
   socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))
 
 },[])
 console.log(time)

  return(
    <>
      <Routes>
        <Route index element={<Message/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
      </Routes>
    </>
  )
}

export default App
