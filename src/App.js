import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Nav from "./Pages/Nav";
import Forgot from "./Pages/Forgot";
import Addproperty from "./Pages/Addproperty";
import Newproperty from "./Pages/Newproperty";
import { AuthProvider } from "./Routes/AuthContext.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Dashboard from "./admin/Dashboard";

function App() {
  return (
    <div className="h-max bg-gradient-to-r from-cyan-500 to-blue-500">
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
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/Forgot" exact element={<Forgot />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
