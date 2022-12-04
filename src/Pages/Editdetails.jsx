import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Button from "../components/Button";
import Index from "../components/Index";
import { db, usersDbRef } from "../firebase";
import { useAuth } from "../Routes/AuthContext";

const Editdetails = () => {
  const { currentUser } = useAuth();

  const [values, setValues] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    houseAddress: "",
    role: "",
  });
  const [button, setButton] = useState(true);
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

  const onUpdate = async () => {
    const data = {
      fullName: values.fullName,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      houseAddress: values.houseAddress,
      role: values.role,
    };
    const docRef = doc(db, "users", currentUser.uid);
    setDoc(docRef, data)
      .then(() => {
        alert("Document updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editClick = () => {
    button === true ? setButton(false) : setButton(true);
  };

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = {
        fullName: docSnap.data().fullName,
        emailAddress: docSnap.data().emailAddress,
        phoneNumber: docSnap.data().phoneNumber,
        houseAddress: docSnap.data().houseAddress,
        role: docSnap.data().role,
      };
      setValues(data);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className="container-fluid">
      <div className="grid h-screen grid-cols-1 gap-4 place-items-center">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="grid grid-flow-col text-center p-10 font-bold text-blue-700 text-2xl">
            EDIT DETAILS
            <AiFillEdit
              className="h-10 w-10 bg-slate-200 drop-shadow-lg p-1 rounded-full"
              onClick={editClick}
            />
          </h1>
          <div className="grid grid-cols-1 gap-3">
            {inputs.map((input) => (
              <div className="grid grid-flow-col">
                <Index
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                  disabled={button}
                />
              </div>
            ))}
            <div className="mx-5 flex justify-center">
              {/* <Button
                name={"Update"}
                styles={
                  "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                }
              /> */}
              <button
                onClick={onUpdate}
                className="w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editdetails;
