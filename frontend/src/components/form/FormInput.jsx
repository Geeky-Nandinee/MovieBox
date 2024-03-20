import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
<<<<<<< HEAD
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white peer transition"
=======
        type="text"
        className="bg-transparent rounded border-2 border-dark-subtle focus:border-white w-full text-lg outline-none p-1 text-white peer transition"
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
