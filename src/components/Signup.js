import React from "react";

function Signup() {
    return (
        <div className="bg-indigo-700 w-full h-screen">
            <div class="grid grid-cols-1 gap-4 place-items-center h-screen">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">Sign up</h1>
                    <form className="grid grid-cols-1 gap-3">
                        <div className="mx-5">
                            <input type="text" placeholder="Name" className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"></input>
                        </div>
                        <div className="mx-5">
                            <input type="email" placeholder="E-mail" className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"></input>
                        </div>
                        <div className="mx-5">
                            <input type="tel" placeholder="Phone" className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"></input>
                        </div>
                        <div className="mx-5">
                            <input type="password" placeholder="Password" className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"></input>
                        </div>
                        <div className="mx-5">
                            <input type="password" placeholder="Re-enter Password" className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"></input>
                        </div>
                        <div className="mx-5 flex justify-center">
                            <button type="button" class="w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5">Signup</button>
                        </div>
                    </form>
                    <button type="button" class="drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup;