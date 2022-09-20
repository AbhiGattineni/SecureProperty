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
  const [loginshow, setLoginshow] = useState(false);
  const [signupshow, setSignupshow] = useState(false);
  const [navshow, setNavshow] = useState(true);

  const refer = { setLoginshow, setSignupshow, setNavshow };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
