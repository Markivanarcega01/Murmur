import "./App.css";
import { Routes, Route } from "react-router";
import Message from "./page/Message/Message";
import Login from "./page/Login/Login";
import Registration from "./page/Registration/Registration";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Message/>} /> */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Message />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
