import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import TestComponent from "./pages/TestComponent";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Chat></Chat>}></Route>
        <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
        <Route path="/test" element={<TestComponent></TestComponent>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
