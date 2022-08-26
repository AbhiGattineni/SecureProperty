import React from "react";
import Button from "../components/Button";

function Nav() {
    return (
        <div className="w-full h-screen">
            <div className="w-full h-20 bg-gray-200 justify-between flex items-center p-4">
                <h1 className="text-xl font-medium">SECURE PROPERTY</h1>
                <nav>
                    <Button name='=' styles='w-5 bg-blue-500 rounded text-white md:hidden' />
                    <ul className="fixed left-0 right-0 min-h-screen bg-gray-200 space-y-4 p-4 transform traslate-x-full md:min-h-0 md:space-y-0 md:space-x-6 md:p-0 md:tarnslate-x-0 md:relative md:flex">
                        <li><a href="#" className="text-black">VIEW PROPERTY</a></li>
                        <li><a href="#" className="text-black">ADD PROPERTY</a></li>
                        <li><a href="#" className="text-black">LOGOUT</a></li>
                    </ul>
                </nav>
            </div>
            <div className="text-center drop-shadow-lg shadow-black text-2xl my-20">
                <h1>DASHBOARD PAGE</h1>
            </div>
        </div>
    )
}

export default Nav;