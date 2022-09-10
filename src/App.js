
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Nav from './Pages/Nav';
import { useState } from 'react';

function App() {
  const [loginshow,setLoginshow] = useState(false);
  const [signupshow,setSignupshow] = useState(false);
  const [navshow,setNavshow] = useState(true);

  const refer = {setLoginshow,setSignupshow,setNavshow};
  return (
    <div>
      {/* {loginshow?<Login ref={refer}/>:null}
      {signupshow?<Signup ref={refer}/>:null}
      {navshow?<Nav ref={refer}/>:null} */}
      <Login />
      <Signup />
      <Nav />
    </div>
  );
}

export default App;
