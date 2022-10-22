import React from 'react'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import { MdAddBusiness } from 'react-icons/md';
import {MdDashboard} from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title : "VIEW PROPERTIES", logo : BiBuildings},
    { title : "ADD PROPERTIES", logo : MdAddBusiness},
    { title : "VIEW USERS", logo : ImUsers},
    { title : "ADD USERS", logo : FaUserPlus},
  ]
  return (
    <div className="">
      <div className={`${open ? "w-full lg:w-1/5 md:w-2/6" : "w-14"} duration-500 px-2 text-white h-screen absolute bg-blue-500 pt-5`}>
        <FaBars className='top-4 absolute right-4 cursor-pointer' onClick={() => setOpen(!open)} />
        <div className={`py-2 flex gap-x-4 items-center px-1`}>
          <h1><MdDashboard /></h1>
          <h1 className={`origin-left font-medium text-base duration-300 ${!open && 'scale-0'}`}>DASHBOARD</h1>
        </div>
        <ul className='pt-6'>
          {Menus.map((menu,index) => (
            <li key={index} className='gap-x-4 px-1 text-center py-2 mt-1 duration-500 cursor-pointer flex hover:bg-white/20 rounded'>
              <Link><menu.logo/></Link>
              <Link className={`origin-left duration-500 text-sm ${!open && 'hidden'}`}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="font-xl font-bold">
        DASHBOARD
      </div>
    </div>
  )
}

export default Dashboard