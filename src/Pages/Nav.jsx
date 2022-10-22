import React, { useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Addproperty from "./Addproperty";
import Editdetails from "./Editdetails";
import DisplayImages from "./DisplayImages";
import Dashboard from "./Dashboard";

function Nav() {
  const tabList = {
    dash: <Dashboard/>,
    view: <DisplayImages />,
    add: <Addproperty />,
    edit: <Editdetails />,
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Testing");
  const logout = async () => {
    console.log("Executed");
    setError("");
    try {
      await signOut(auth);
      navigate("/Login");
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full h-20 bg-gray-200 justify-between flex items-center p-4">
        <h1 className="text-xl font-medium">SECURE PROPERTY</h1>
        {/* <Link to={"/"} className="text-xl font-medium">
          SECURE PROPERTY
        </Link> */}
        <nav>
          <ul className="fixed left-0 right-0 min-h-screen bg-gray-200 space-y-4 p-4 transform traslate-x-full md:min-h-0 md:space-y-0 md:space-x-6 md:p-0 md:tarnslate-x-0 md:relative md:flex">
            <li>
              <button
                className="text-black"
                onClick={() => {
                  console.log("Clicked");
                  setActiveTab("dash");
                }}
              >
                DASHBOARD
              </button>
            </li>
            <li>
              <button
                className="text-black"
                onClick={() => {
                  console.log("Clicked");
                  setActiveTab("view");
                }}
              >
                VIEW PROPERTY
              </button>
            </li>
            <li>
              <button
                className="text-black"
                onClick={() => {
                  setActiveTab("add");
                }}
              >
                ADD PROPERTY
              </button>
            </li>
            <li>
              <button
                className="text-black"
                onClick={() => {
                  setActiveTab("edit");
                }}
              >
                EDIT PROFILE
              </button>
            </li>
            <li>
              <button onClick={logout} name="LOGOUT" className="bg-gray-200">
                LOGOUT
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="text-center drop-shadow-lg shadow-black text-2xl">
        {tabList[activeTab]}
      </div>
    </div>
  );
}

export default Nav;
