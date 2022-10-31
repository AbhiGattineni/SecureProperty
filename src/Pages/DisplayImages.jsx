import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs } from 'firebase/firestore';
import { propertiesDbRef } from "../firebase";

function DisplayImages() {
  const tabs = [
    { name: "property 1", link: "#", img: "/Images/lib1.jpg", },
    { name: "property 2", link: "#", img: "/Images/lib2.jpg", },
    { name: "property 3", link: "#", img: "/Images/lib5.jpg", },
  ];
  const [users, setUsers] = useState([]);
  const [openTab, setOpenTab] = useState("property 1");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(propertiesDbRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers()
  }, [])
  return (
    <div className="bg-white">
      <div className="grid grid-cols-4">
        <div className="text-center">
          <ul className="grid grid-cols-1 divide-y">
            {tabs.map((tab) => (
              <li key={tab.name} className="py-3 hover:bg-gray-300">
                <a
                  href={tab.link}
                  onClick={() => setOpenTab(tab.name)}>
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 col-span-3 bg-gray-400">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={tab.name === openTab ? "block" : "hidden"}>
              <div className="relative w-6 mb-3">
                <select className="p-2 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {users.map((user) => (
                  <div>
                    <div>
                      <img className="w-full h-40" src={user.propertyUrl} alt="Property" />
                    </div>
                    <div className="pb-1 bg-gray-300 text-center font-medium relative h-10">
                      <div className="text-xl absolute inset-x-0 bottom-0 h-10 uppercase">{user.propertyName}</div>
                    </div>
                  </div>
                )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayImages;
