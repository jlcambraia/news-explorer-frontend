import "./Login.css";

import { useState } from "react";

export default function Login() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(true);

  function handleEmailChange(evt) {
    const input = evt.target;
    setEmailInputValue(input.value.trim().replace(/\s+/g, ""));
    setIsEmailValid(input.validity.valid);
    setEmailErrorMessage(input.validationMessage);
  }

  function handlePasswordChange(evt) {
    const input = evt.target;
    setPasswordInputValue(input.value.trim().replace(/\s+/g, ""));
    setIsPasswordValid(input.validity.valid);
    setPasswordErrorMessage(input.validationMessage);
  }

  return (
    <>
      <form className="login__form" noValidate>
        <label className="login__email-input-label">
          Email
          <input
            className="login__email-input"
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            autoComplete="email"
          />
          {!isEmailValid && (
            <span className="login__email-input-error-message">
              {emailErrorMessage}
            </span>
          )}
        </label>

        <label className="login__password-input-label">
          Password
          <input
            className="login__password-input"
            type="password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
            minLength={8}
            maxLength={20}
            autoComplete="password"
          />
          {!isPasswordValid && (
            <span className="login__password-input-error-message">
              {passwordErrorMessage}
            </span>
          )}
        </label>
      </form>
      <button
        className={
          isEmailValid &&
          emailInputValue.length > 0 &&
          isPasswordValid &&
          passwordInputValue.length > 0
            ? "login__button"
            : "login__button_disabled"
        }
      >
        Sign in
      </button>
    </>
  );
}
