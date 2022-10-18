import React, { useState } from "react";

function DisplayImages() {
  const tabs = [
    { name: "property 1", link: "#", img: "/Images/lib1.jpg", },
    { name: "property 2", link: "#", img: "/Images/lib2.jpg", },
    { name: "property 3", link: "#", img: "/Images/lib5.jpg", },
  ];
  const [openTab, setOpenTab] = useState("property 1");
  const inputs = [
    {
      id: 1,
      name: "january",
      img: "/Images/lib1.jpg",
    },
    {
      id: 2,
      name: "februay",
      img: "/Images/lib2.jpg",
    },
    {
      id: 3,
      name: "march",
      img: "/Images/lib3.jpg",
    },
    {
      id: 4,
      name: "april",
      img: "/Images/lib5.jpg",
    },
  ];
  return (
    <div className="bg-white h-screen">
      <div className="grid grid-cols-4">
        <div className="text-center px-3">
          <ul className="grid grid-cols-1 divide-y">
            {tabs.map((tab) => (
              <li key={tab.name} className="py-3">
                <a
                  href={tab.link}
                  onClick={() => setOpenTab(tab.name)}>
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 col-span-3 bg-gray-400 h-screen">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {inputs.map((input) => (
                  <div className="max-w-sm overflow-hidden shadow-lg h-48">
                    <img className="w-full h-40" src={tab.img} alt="Property" />
                    <div className="pb-1 bg-gray-300 text-center font-medium relative h-10">
                      <div className="text-xl absolute inset-x-0 bottom-0 h-10 uppercase">{input.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayImages;
