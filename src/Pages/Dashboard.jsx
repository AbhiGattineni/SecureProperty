import React from 'react'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import { MdAddBusiness } from 'react-icons/md';
import { MdDashboard } from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Viewproperties from '../admin/Viewproperties';
import ViewUsers from '../admin/ViewUsers';
import AddUsers from '../admin/AddUsers';
import Addproperties from '../admin/Addproperties';

function Dashboard() {
  const [open, setOpen] = useState(false);
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
  ]
  return (
    <div className="flex">
      <div className={`${open ? "w-full lg:w-1/5 md:w-2/6" : "w-14"} duration-500 px-2 text-white h-screen bg-blue-500 pt-5`}>
        <FaBars className='top-4 absolute left-3 cursor-pointer' onClick={() => setOpen(!open)} />
        <div className={`py-2 flex gap-x-4 items-center px-1`}>
          <h1><MdDashboard /></h1>
          <h1 className={`origin-left font-medium text-base duration-300 ${!open && 'scale-0'}`}>DASHBOARD</h1>
        </div>
        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <li key={index} className='gap-x-4 px-1 text-center py-2 mt-1 duration-500 cursor-pointer flex hover:bg-white/20 rounded'>
              <button className='flex' onClick={() => { setActiveTab(menu.tabname); }}>
                <menu.logo />
                <div className={`mx-3 origin-left duration-500 text-sm ${!open && 'hidden'}`}>{menu.title}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-fluid py-32">
        <div className='grid grid-cols-1 gap-4 place-items-center'>
          <div className="drop-shadow-lg shadow-black text-2xl">
            {tabList[activeTab]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard