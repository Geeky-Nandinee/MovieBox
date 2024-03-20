import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";

import { commonModalClasses } from "../../utils/theme";
=======
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const inputRef = useRef();
  const { updateNotification } = useNotification();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOtp([...newOtp]);
  };

  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "invalid OTP");

    // submit otp
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);

  // if(!user) return null;

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className={commonModalClasses}>
=======
        <form className="bg-secondary rounded p-6 space-y-6">
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
<<<<<<< HEAD
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
=======
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
>>>>>>> parent of 3d0e0cb (Commited by Smit Modi on 20/03/2024 - Setting up Axios for data transfer between Backend and Frontend)
                />
              );
            })}
          </div>

          <div>
            <Submit value="Verify Account" />
            <button
              onClick={handleOTPResend}
              type="button"
              className="dark:text-white text-blue-500 font-semibold hover:underline mt-2"
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
