import "./Register.css";

import { useState } from "react";

export default function Register({ handleRegistration }) {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(true);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

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

  function handleUsernameChange(evt) {
    const input = evt.target;
    setUsernameInputValue(input.value.trim().replace(/\s+/g, ""));
    setIsUsernameValid(input.validity.valid);
    setUsernameErrorMessage(input.validationMessage);
  }

  return (
    <>
      <form className="register__form" noValidate>
        <label className="register__email-input-label">
          Email
          <input
            className="register__email-input"
            type="email"
            placeholder="Insira seu email"
            onChange={handleEmailChange}
            autoComplete="email"
          />
          {!isEmailValid && (
            <span className="register__email-input-error-message">
              {emailErrorMessage}
            </span>
          )}
        </label>

        <label className="register__password-input-label">
          Senha
          <input
            className="register__password-input"
            type="password"
            placeholder="Insira a senha"
            onChange={handlePasswordChange}
            minLength={8}
            maxLength={20}
            autoComplete="password"
          />
          {!isPasswordValid && (
            <span className="register__password-input-error-message">
              {passwordErrorMessage}
            </span>
          )}
        </label>

        <label className="register__username-input-label">
          Nome de usuário
          <input
            className="register__username-input"
            type="text"
            placeholder="Insira seu nome de usuário"
            onChange={handleUsernameChange}
            minLength={2}
            maxLength={30}
          />
          {!isUsernameValid && (
            <span className="register__username-input-error-message">
              {usernameErrorMessage}
            </span>
          )}
        </label>
      </form>
      <button
        onClick={() =>
          handleRegistration(
            emailInputValue,
            passwordInputValue,
            usernameInputValue
          )
        }
        className={
          isEmailValid &&
          emailInputValue.length > 0 &&
          isPasswordValid &&
          passwordInputValue.length > 0 &&
          isUsernameValid &&
          usernameInputValue.length > 0
            ? "register__button"
            : "register__button_disabled"
        }
      >
        Inscrever-se
      </button>
    </>
  );
}
