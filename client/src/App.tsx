import './App.css'
import { Routes, Route } from "react-router"
import Message from "./page/Message"
import Login from './page/Login'
import Registration from './page/Registration'

function App() {


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
