import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Nav from './Pages/Nav';
import { useState } from 'react';

function App() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Nav" element={<Nav/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
