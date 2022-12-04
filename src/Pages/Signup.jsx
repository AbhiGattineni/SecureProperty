import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Button from "../components/Button";
import Index from "../components/Index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import Popup from "../components/Popup";

function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [mainPage, setMainPage] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const inputs = [
    // {
    //   id: 1,
    //   name: "username",
    //   type: "text",
    //   placeholder: "Username",
    //   errorMessage:
    //     "Username should be 4-16 characters and should not contain spaces and special characters",
    //   pattern: "^[A-Za-z0-9]{4,16}$",
    //   required: true,
    // },
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "Email is not valid",
      pattern:
        "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$",
      required: true,
    },
    // {
    //   id: 3,
    //   name: "phone",
    //   type: "text",
    //   placeholder: "Phone",
    //   errorMessage: "Phone number is not valid",
    //   pattern: "^[0-9]{10}$",
    //   required: true,
    // },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 charecters and include atleast 1 charecter, 1 number and 1 special character",
      pattern:
        "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,20}$",
      required: true,
    },
    {
      id: 3,
      name: "repassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "password doesn't match",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const data = {
          fullName: userCredential.user.displayName,
          emailAddress: userCredential.user.email,
          phoneNumber: userCredential.user.phoneNumber,
          role: "User",
        };

        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data() === undefined) {
          setDoc(docRef, data)
            .then((usersDbRef) => {})
            .catch((error) => {
              console.log(error);
            });
          setValues({
            fullName: userCredential.user.displayName,
            emailAddress: userCredential.user.email,
            phoneNumber: userCredential.user.phoneNumber,
            role: "User",
          });
        }
        navigate("/");
      }
    );
  };

  const handleOnClose = () => {
    setShowModel(false);
    navigate("/");
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto h-screen grid place-items-center">
      <div className="grid grid-cols-1 place-items-center w-full md:1/3 lg:w-1/3">
        <div className="bg-white/10 w-full rounded-lg drop-shadow-2xl border-1 border-white">
          <h1 className="text-center p-10 font-bold text-white text-2xl">
            Sign up
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3"
            method="POST"
          >
            {inputs.map((input) => (
              <Index
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            {errorPassword ? (
              <div className="text-center">
                <p className="text-red-500">Email already exist</p>
              </div>
            ) : null}
            <div className="mx-5 flex justify-center">
              <Button
                name="Signup"
                styles={
                  "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                }
              />
            </div>
          </form>
          <Link
            to={"/Login"}
            className="drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800"
          >
            Sign In
          </Link>
        </div>
      </div>
      <Popup
        visible={showModel}
        onClose={handleOnClose}
        name2={"Click button to login"}
        name1={"Account created"}
        button={"Sign In"}
        val={true}
        mainPage={mainPage}
      />
    </div>
  );
}

export default Signup;
