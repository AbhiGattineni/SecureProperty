import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Nav from './Pages/Nav';
import { useState } from 'react';
import { useEffect } from "react";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedin")
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <Router>
        <Routes>
          <Route path="/" exact element={loggedIn ? <Nav /> : <Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/Login" exact element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
