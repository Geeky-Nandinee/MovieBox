import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Signup() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="John Doe" name="name" />
          <FormInput label="Email" placeholder="john@email.com" name="email" />
          <FormInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
