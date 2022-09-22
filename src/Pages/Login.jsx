import { Link } from "react-router-dom";
import React, { useState } from "react";
import Button from '../components/Button';
import Index from '../components/Index';
import Label from "../components/Label";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import Popup from "./Popup";
import Nav from "./Nav";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [showModel, setShowModel] = useState(false)
    const [val,setVal] = useState(false)
    const [name2,setName2] = useState()
    const [mainPage,setMainPage] = useState(true)
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
        }
    ]

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = values;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            setName2(email)
            setShowModel(true)
            setVal(true)
        }
        catch (error) {
            setName2("Invalid email or password")
            setShowModel(true)
            setVal(false)
        }

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };
    const handleOnClose = () => setShowModel(false)

    return (
        <div className="">
            <div class="grid grid-cols-1 gap-4 place-items-center h-screen">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">Sign In</h1>
                    <form onSubmit={handleLogin} className="grid grid-cols-1 gap-3">
                        {inputs.map((input) => (
                            <Index key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                        ))}
                        <div className="mx-5 flex justify-center">
                            <Button name={'Login'} styles={"w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"} />
                        </div>
                    </form>
                    <div className="text-center m-3 text-white">
                        <a href="#" className="text-white">Forgot your password?</a>
                    </div>
                    <div className="text-center">
                        <Link to={"/signup"} className="text-sm text-white">Don't have an account?</Link>
                    </div>
                    <Link to={"/signup"} className="drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800">Sign Up</Link>
                </div>
            </div>
            <Popup visible={showModel} onClose={handleOnClose} name1={"Secure Property"} name2={name2} button={"OK"} val={val} mainPage={mainPage}/>
        </div>
    )
}

export default Login;