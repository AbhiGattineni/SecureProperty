import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { MdAddBusiness } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Viewproperties from "../admin/Viewproperties";
import ViewUsers from "../admin/ViewUsers";
import AddUsers from "../admin/AddUsers";
import Addproperties from "../admin/Addproperties";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const tabList = {
    viewprop: <Viewproperties />,
    addprop: <Addproperties />,
    viewuser: <ViewUsers />,
    adduser: <AddUsers />,
  };
  const [activeTab, setActiveTab] = useState("viewuser");
  const Menus = [
    { title: "VIEW PROPERTIES", logo: BiBuildings, tabname: "viewprop" },
    { title: "ADD PROPERTIES", logo: MdAddBusiness, tabname: "addprop" },
    { title: "VIEW USERS", logo: ImUsers, tabname: "viewuser" },
    { title: "ADD USERS", logo: FaUserPlus, tabname: "adduser" },
  ];
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
    <div>
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
      <div className="flex">
        <div
          className={`${
            open ? "w-full lg:w-1/5 md:w-2/6" : "w-14"
          } duration-500 px-2 text-white h-screen bg-blue-500 pt-5`}
        >
          <FaBars
            className="top-4 absolute left-3 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <div className={`py-2 flex gap-x-4 items-center px-1`}>
            <h1>
              <MdDashboard />
            </h1>
            <h1
              className={`origin-left font-medium text-base duration-300 ${
                !open && "scale-0"
              }`}
            >
              DASHBOARD
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <li
                key={index}
                className="gap-x-4 px-1 text-center py-2 mt-1 duration-500 cursor-pointer flex hover:bg-white/20 rounded"
              >
                <button
                  className="flex"
                  onClick={() => {
                    setActiveTab(menu.tabname);
                  }}
                >
                  <menu.logo />
                  <div
                    className={`mx-3 origin-left duration-500 text-sm ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-fluid py-32">
          <div className="grid grid-cols-1 gap-4 place-items-center">
            <div className="drop-shadow-lg shadow-black text-2xl">
              {tabList[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
