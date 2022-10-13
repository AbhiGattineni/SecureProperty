import React from "react";
import img1 from "../Images/lib1.jpg";
import img2 from "../Images/lib2.jpg";
import img3 from "../Images/lib3.jpg";
import img5 from "../Images/lib5.jpg";
import img6 from "../Images/lib6.jpg";

function DisplayImages() {
  const inputs = [
    {
      id: 1,
      name: "janauary",
    },
    {
      id: 2,
      name: "februay",
    },
    {
      id: 3,
      name: "march",
    },
    {
      id: 4,
      name: "april",
    },
  ];
  return (
    <div className="grid grid-flow-col">
      <div className="h-full bg-white text-center px-3">
        <ul className="grid grid-cols-1 divide-y gap-4">
          <li className="px-5 py-3 border-2 border-black rounded-lg">
            <a href="">PROPERTY 1</a>
          </li>
          <li className="px-5 py-3 border-2 border-black rounded-lg">
            <a href="">PROPERTY 2</a>
          </li>
          <li className="px-5 py-3 border-2 border-black rounded-lg">
            <a href="">PROPERTY 3</a>
          </li>
          <li className="px-5 py-3 border-2 border-black rounded-lg">
            <a href="">PROPERTY 4</a>
          </li>
        </ul>
      </div>
      <div className="p-3">
        <div className="">
          <h1 className="text-left text-sm m-3 font-black">2021</h1>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {inputs.map((input) => (
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full" src={img1} alt="Sunset in the mountains" />
              <div class="px-6 py-2 bg-white text-center">
                <div class="text-xl">{input.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayImages;
