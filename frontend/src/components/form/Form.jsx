import React, { useRef, useState } from "react";
import "./form.scss";
import Logo from "../../assets/img/logo.png";
import Input from "../input/Input";

import { useNavigate } from "react-router-dom";

const Form = ({ formType }) => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const handleAsync = () => {
    setIsLoading(true);
    fetch(`http://localhost:5000/tratrac-health/api/v1/auth/${formType}`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        ...(formType === "register" && { name: nameRef.current.value }),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        if ("email" in result) {
          navigate("/dash");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form__container">
      <div className="form__card">
        <img src={Logo} alt="logo" />
        <b>{formType === "register" ? "create an account" : "login"}</b>
        {formType === "register" && (
          <Input title="Name" type="text" refId={nameRef} />
        )}
        <Input title="Email" type="email" refId={emailRef} />
        <Input title="Password" type="password" refId={passwordRef} />
        {formType === "login" && (
          <div className="form__recovery">
            <div className="form__recovery__rem">
              <div className="form__recovery__rem__check"></div>
              <p>Remember Me</p>
            </div>
            <div className="form__recovery__forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
        )}
        {formType === "register" && (
          <div className="form__terms">
            <div className="form__recovery__rem__check"></div>
            <div className="form__terms__route">
              <p>I accept the</p>
              <a href="#">Terms and condition</a>
            </div>
          </div>
        )}
        <div className="form__submit">
          <button onClick={handleAsync}>
            {formType === "register" && !isLoading && "register"}
            {formType === "login" && !isLoading && "login"}
            {isLoading && "Loading..."}
          </button>
        </div>
        {formType === "register" && (
          <div className="form__toggle">
            <p>Already have an account?</p>
            <a href="/login">Login</a>
          </div>
        )}
        {formType === "login" && (
          <div className="form__toggle">
            <p>Dont have an account</p>
            <a href="/">Create an account</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
