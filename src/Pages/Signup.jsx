import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from '../components/Button';
import Index from '../components/Index';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Popup from "./Popup";

function Signup() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        repassword: ""
    });
    const [showModel, setShowModel] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false);
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username should be 4-16 characters and should not contain spaces and special characters",
            pattern: "^[A-Za-z0-9]{4,16}$",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Email is not valid",
            pattern: "^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$",
            required: true
        },
        {
            id: 3,
            name: "phone",
            type: "text",
            placeholder: "Phone",
            errorMessage: "Phone number is not valid",
            pattern: "^[0-9]{10}$",
            required: true
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password should be 8-20 charecters and include atleast 1 charecter, 1 number and 1 special character",
            pattern: "^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,20}$",
            required: true
        },
        {
            id: 5,
            name: "repassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "password doesn't match",
            pattern: values.password,
            required: true
        }
    ]


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, phone, password, repassword } = values;
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const res = fetch('https://propert-3ffe6-default-rtdb.firebaseio.com/userdata.json',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, phone, password }),
                }
            );
            setErrorPassword(false)
            setShowModel(true)
        }
        catch (error) {
            setErrorPassword(true)
        }

    }

    const handleOnClose = () => setShowModel(false)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    return (
        <div className="container-fluid py-5">
            <div className="grid grid-cols-1 gap-4 place-items-center">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">Sign up</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3" method="POST">
                        {inputs.map((input) => (
                            <Index key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                        ))}
                        {errorPassword ? (
                            <div className="text-center">
                                <p className="text-red-500">Email already exist</p>
                            </div>
                        ) : null}
                        <div className="mx-5 flex justify-center">
                            <Button name="Signup" styles={"w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"} />
                        </div>
                    </form>
                    <Link to={"/"} className="drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800">Sign In</Link>
                </div>
            </div>
            <Popup visible={showModel} onClose={handleOnClose} />
        </div>
    )
}

export default Signup;