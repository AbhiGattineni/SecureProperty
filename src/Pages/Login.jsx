import React, { useState } from "react";
import Button from '../components/Button';
import Index from '../components/Index';
import Label from "../components/Label";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'

function Login({ refs, refer }) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errorPassword, setErrorPassword] = useState(false);
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
            refer.setLoginshow(false)
            refer.setSignupshow(false)
            refer.setNavshow(true)
        }
        catch (error) {
            setErrorPassword(true)
        }

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };
    return (
        <div className="bg-indigo-700 w-full">
            <div class="grid grid-cols-1 gap-4 place-items-center h-screen">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">Login</h1>
                    <form onSubmit={handleLogin} className="grid grid-cols-1 gap-3">
                        {inputs.map((input) => (
                            <Index key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                        ))}
                        {errorPassword ? (
                            <div className="text-center">
                                <p className="text-red-500">Invalid Email or Password</p>
                            </div>
                        ) : null}
                        <div className="mx-5 flex justify-center">
                            <Button name={'Login'} styles={"w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"} />
                        </div>
                    </form>
                    <div className="text-center m-3 text-white">
                        <a href="#" className="text-white">Forgot your password?</a>
                    </div>
                    <a href="#signup"><Label name={"Don't have an account?"} styles={"text-sm text-center text-white"} /></a>
                    <Button name={"SignUp"} styles={"drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800"} ></Button>
                </div>
            </div>
        </div>
    )
}

export default Login;