import React, { useState } from "react";
import Button from "../components/Button";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import Index from "../components/Index";

function Addproperty() {
  const [values, setValues] = useState({
    name: "",
    address: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name of property",
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Located Address",
    },
  ]

  const navigate = useNavigate()
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  const logout = async () => {
    await signOut(auth);
    navigate('/Login')
    window.localStorage.removeItem("isLoggedin")
    window.localStorage.removeItem("email")
  }
  return (
    <div className="w-full h-screen">
      <div className="w-full h-20 bg-gray-200 justify-between flex items-center p-4">
        <h1 className="text-xl font-medium">SECURE PROPERTY</h1>
        <nav>
          <Button name='=' styles='w-5 bg-blue-500 rounded text-white md:hidden' />
          <ul className="fixed left-0 right-0 min-h-screen bg-gray-200 space-y-4 p-4 transform traslate-x-full md:min-h-0 md:space-y-0 md:space-x-6 md:p-0 md:tarnslate-x-0 md:relative md:flex">
            <li><a href="#" className="text-black">VIEW PROPERTY</a></li>
            <li><Link to={"/Addproperty"} className="text-black">ADD PROPERTY</Link></li>
            <li><button onClick={logout} name="LOGOUT" className='bg-gray-200'>LOGOUT</button></li>
          </ul>
        </nav>
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center mt-10">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="text-center p-10 font-bold text-blue-500 text-2xl">ADD PROPERTY</h1>
          <form className="grid grid-cols-1 gap-3">
            {inputs.map((input) => (
              <Index key={input.id} {...input} value={values[input.name]} />
            ))}
            <input class="form-control w-1/3 px-3 ml-12 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded" type="file" multiple></input>
            <div className="mx-5 flex justify-center">
              <Button name={'Submit'} styles={"w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addproperty