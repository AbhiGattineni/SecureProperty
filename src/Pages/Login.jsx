import React from "react";
import Button from '../components/Button';
import Index from '../components/Index';
import Label from "../components/Label";


function Login() {
    return (
        <div className="bg-indigo-700 w-full">
            <div class="grid grid-cols-1 gap-4 place-items-center h-screen">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">Login</h1>
                    <form className="grid grid-cols-1 gap-3">
                        <div className="mx-5">
                            <Index type="email" Label="E-mail" styles="w-full px-2 py-2 border-2 border-gray-500 rounded-lg" />
                        </div>
                        <div className="mx-5">
                            <Index type="password" Label="Password" styles="w-full px-2 py-2 border-2 border-gray-500 rounded-lg" />
                        </div>
                        <div className="mx-5 flex justify-center">
                            <Button name={'Login'} styles={"w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"} />
                        </div>
                    </form>
                    <div className="text-center m-3 text-white">
                        <a href="#" className="text-white">Forgot your password?</a>
                    </div>
                    <a href="#"><Label name={"Don't have an account?"} styles={"text-sm text-center text-white"} /></a>
                    <Button name={"SignUp"} styles={"drop-shadow-2xl rounded-t-full mt-5 bg-white h-24 w-full flex items-center justify-center font-bold text-2xl text-blue-800"} ></Button>
                </div>
            </div>
        </div>
    )
}

export default Login;