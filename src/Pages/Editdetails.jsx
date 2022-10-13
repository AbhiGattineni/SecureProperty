import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

import Button from "../components/Button";
import Index from "../components/Index";

const Editdetails = () => {
  const [values, setValues] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    houseAddress: "",
  });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
    },
    {
      id: 2,
      name: "emailAddress",
      type: "text",
      placeholder: "Email Address",
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
    },
    {
      id: 4,
      name: "houseAddress",
      type: "text",
      placeholder: "House Address",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-4 place-items-center mt-10">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="text-center p-10 font-bold text-blue-700 text-2xl">
            EDIT DETAILS
          </h1>
          <form onSubmit={""} className="grid grid-cols-1 gap-3">
            {inputs.map((input) => (
              <div className="grid grid-flow-col">
                <Index
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
                <AiFillEdit className=" bg-slate-200 drop-shadow-lg p-1 rounded-full" />
              </div>
            ))}
            <div className="mx-5 flex justify-center">
              <Button
                name={"Submit"}
                styles={
                  "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editdetails;
