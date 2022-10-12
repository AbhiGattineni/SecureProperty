import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Nav from "./Pages/Nav";
import Addproperty from "./Pages/Addproperty";
import Newproperty from "./Pages/Newproperty";
import { AuthProvider } from "./Routes/AuthContext.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedin");
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Nav />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/Addproperty"
              element={
                <PrivateRoute>
                  <Addproperty />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/newproperty"
              element={
                <PrivateRoute>
                  <Newproperty />
                </PrivateRoute>
              }
            />
            {/* <PrivateRoute exact path="/" component={Nav} /> */}
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/Login" exact element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
