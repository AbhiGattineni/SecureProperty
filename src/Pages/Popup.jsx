import React from 'react';
import { Link } from "react-router-dom";

function Popup({visible, onClose}) {
    if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-72 relative">
        <div className="absolute top-0 right-0 h-6 w-8 hover:bg-red-400 text-center">
            <button onClick={onClose} className='hover:text-white'>X</button>
        </div>
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Account created
        </h1>
        <p className="text-center text-gray-700 m-5">Click button to login</p>
        <div className="text-center mb-3">
          <Link to={"/"} className="px-5 py-2 bg-gray-700 text-white rounded">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default Popup