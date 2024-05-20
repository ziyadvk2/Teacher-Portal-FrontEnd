import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './Home';
import AppBar from './AppBar';
import LoginPage from './LoginPage';
import SignUpPage from "./SignUpPage";
import LandingPage from "./LandingPage";

const App = () => {
  const {user} = useSelector((state) => state.userReducer);
  return (
    <div>
      <AppBar />
      <Routes>
        {!user?
        <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        </>:
        <>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
        </>}
      </Routes>
    </div>
  );
};

export default App;
