import React, { useState } from "react";
import Button from "../components/Button";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Index from "../components/Index";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import UploadImages from "./UploadImages";

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
  ];
  const [images, setImages] = useState(null);
  const handleChange = (event) => {
    setImages(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const image = event.target[0].files[0];
    console.log(image);
    // uploadBytes(imageRef, images).then(() => {
    //   alert("Image Uploaded!")
    // })
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logout = async () => {
    await signOut(auth);
    navigate("/Login");
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("email");
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-screen">
      {/* <div className="w-full h-20 bg-gray-200 justify-between flex items-center p-4">
        <Link to={"/"} className="text-xl font-medium text-black">SECURE PROPERTY</Link>
        <nav>
          <Button name='=' styles='w-5 bg-blue-500 rounded text-white md:hidden' />
          <ul className="fixed left-0 right-0 min-h-screen bg-gray-200 space-y-4 p-4 transform translate-x-full md:min-h-0 md:space-y-0 md:space-x-6 md:p-0 md:tarnslate-x-0 md:relative md:flex">
            <li><Link to={"/Newproperty"} className="text-black">VIEW PROPERTY</Link></li>
            <li><Link to={"/Addproperty"} className="text-black">ADD PROPERTY</Link></li>
            <li><button onClick={logout} name="LOGOUT" className='bg-gray-200'>LOGOUT</button></li>
          </ul>
        </nav>
      </div> */}
      <div className="grid grid-cols-1 gap-4 place-items-center mt-10">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="text-center p-10 font-bold text-blue-700 text-2xl">
            ADD PROPERTY
          </h1>
          <UploadImages />
        </div>
      </div>
    </div>
  );
}

export default Addproperty;
