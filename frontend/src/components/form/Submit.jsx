import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy }) {
  return (
    <button
      type="submit"
<<<<<<< HEAD
      className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
=======
      className="w-full rounded bg-white text-secondary hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1"
      value={value}
    />
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
  );
}
