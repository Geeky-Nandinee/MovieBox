import React from "react";
import { BsFillSunFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="bg-navy">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
        <img src="./logo.png" alt="Logo" className="h-12 sm:h-14 md:h-16 lg:h-13 xl:h-13" />
          {/* <img src="./logo.png" alt="Logo" className="h-10" /> */}

          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-gray-800 p-2 rounded-full focus:outline-none">
                <BsFillSunFill className="text-gray-400" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border border-gray-800 bg-transparent rounded-lg px-3 py-1 text-lg focus:outline-none focus:border-white transition text-white"
                placeholder="Search..."
              />
            </li>
            <li className="text-white font-semibold text-lg">Login</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


// import React from "react";
// import { BsFillSunFill } from "react-icons/bs";

// export default function Navbar() {
//   return (
//     <div className="bg-secondary">
//       <div className="max-w-screen-xl mx-auto p-2">
//         <div className="flex justify-between items-center">
//           <img src="./logo.png" alt="" className="h-10" />

//           <ul className="flex items-center space-x-4">
//             <li>
//               <button className="bg-dark-subtle p-1 rounded">
//                 <BsFillSunFill className="text-secondary" size={24} />
//               </button>
//             </li>
//             <li>
//               <input
//                 type="text"
//                 className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
//                 placeholder="search..."
//               />
//             </li>
//             <li className="text-white font-semibold text-lg">Login</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
