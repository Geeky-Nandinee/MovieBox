<<<<<<< HEAD
import React, { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
=======
import React from "react";
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
=======
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <Submit value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
