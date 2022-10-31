import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "../components/Button";
import Index from "../components/Index";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import Popup from "./Popup";
import { auth } from "../firebase";

function Forgot() {
    const [values, setValues] = useState({
        email: "",
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
    ];

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email } = values;
        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Please check your email... \nNOTE : Not recevied E-mail, check in spam folder.')
                })
        }
        catch {
            setName2("Invalid email");
            setShowModel(true);
            setVal(false);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleOnClose = () => setShowModel(false);

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4 place-items-center h-screen">
                <div className="bg-white/10 w-2/3 lg:w-1/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white">
                    <h1 className="text-center p-10 font-bold text-white text-2xl">
                        RESET PASSWORD
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
                                name={"SEND"}
                                styles={
                                    "p-2 mb-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                                }
                            />
                        </div>
                    </form>
                    <div className="text-center my-2">
                        <Link to={"/Login"} className="text-sm text-white">back to login</Link>
                    </div>
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

export default Forgot