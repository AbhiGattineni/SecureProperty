import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLine } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";

import Button from "../components/Button";
import Index from "../components/Index";
import { signInWithEmailAndPassword } from "firebase/auth";
import Popup from "../components/Popup";
import { signInWithGoogle, db, auth, signInWithFacebook } from "../firebase";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const [val, setVal] = useState(false);
  const [name2, setName2] = useState();
  const [mainPage, setMainPage] = useState(true);
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const handleGoogle = () => {
    signInWithGoogle().then(async (result) => {
      const data = {
        fullName: result.user.displayName,
        emailAddress: result.user.email,
        phoneNumber: result.user.phoneNumber,
        role: "User",
      };

      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data() === undefined) {
        setDoc(docRef, data)
          .then((usersDbRef) => {})
          .catch((error) => {
            console.log(error);
          });
        setValues({
          fullName: result.user.displayName,
          emailAddress: result.user.email,
          phoneNumber: result.user.phoneNumber,
          role: "User",
        });
      }
      navigate("/");
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).then(async (result) => {
      const data = {
        fullName: result.user.displayName,
        emailAddress: result.user.email,
        phoneNumber: result.user.phoneNumber,
        role: "User",
      };
      // let response = FetchDoc(result);
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data() === undefined) {
        setDoc(docRef, data)
          .then((usersDbRef) => {})
          .catch((error) => {
            console.log(error);
          });
        setValues({
          fullName: result.user.displayName,
          emailAddress: result.user.email,
          phoneNumber: result.user.phoneNumber,
          role: "User",
        });
      }
      navigate("/");
    });
  };

  const handleFacebook = () => {
    signInWithFacebook()
      .then(async (result) => {
        const data = {
          fullName: result.user.displayName,
          emailAddress: result.user.email,
          phoneNumber: result.user.phoneNumber,
          role: "User",
        };
        // let response = FetchDoc(result);
        const docRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data() === undefined) {
          setDoc(docRef, data)
            .then((usersDbRef) => {})
            .catch((error) => {
              console.log(error);
            });
          setValues({
            fullName: result.user.displayName,
            emailAddress: result.user.email,
            phoneNumber: result.user.phoneNumber,
            role: "User",
          });
        }
        navigate("/");
      })
      .catch((error) => {});
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleOnClose = () => setShowModel(false);

  return (
    <div className="container mx-auto h-screen grid place-items-center">
      <div className="grid grid-cols-1 place-items-center w-full md:1/3 lg:w-1/3">
        <div className="bg-white/10 w-full rounded-lg drop-shadow-2xl border-1 border-white">
          <h1 className="text-center p-10 font-bold text-white text-2xl">
            Sign Inn
          </h1>
          <form onSubmit={handleLogin} className="grid grid-cols-1 gap-3">
            {inputs.map((input) => (
              <Index
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="mx-5 flex justify-center">
              <Button
                name={"Login"}
                styles={
                  "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                }
              />
            </div>
          </form>
          <div className="text-center m-2 text-white">
            <Link to={"/Forgot"} className="text-white">
              Forgot your password?
            </Link>
          </div>
          <div className="text-center">
            <Link to={"/signup"} className="text-sm text-white">
              Don't have an account?
            </Link>
          </div>
          <div className="justify-center flex mt-2">
            <AiOutlineLine className="w-14 h-6 text-zinc-600" />
            <p className="font-medium text-zinc-600">OR</p>
            <AiOutlineLine className="w-14 h-6 text-zinc-600" />
          </div>
          <div className="grid grid-cols-4 justify-items-center mt-2">
            <div />
            <button onClick={handleGoogle}>
              <FcGoogle className="h-10 w-10 bg-slate-200 drop-shadow-lg p-1 rounded-full" />
            </button>
            <button onClick={handleFacebook}>
              <GrFacebookOption className="h-10 w-10 bg-blue-800 text-white drop-shadow-lg p-1 rounded-full" />
            </button>
            <div />
          </div>
          <Link
            to={"/signup"}
            className="drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <Popup
        visible={showModel}
        onClose={handleOnClose}
        name1={"Secure Property"}
        name2={name2}
        button={"OK"}
        val={val}
        mainPage={mainPage}
      />
    </div>
  );
}

export default Login;
