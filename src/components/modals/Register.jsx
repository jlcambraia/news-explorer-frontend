import "./Register.css";

import { useContext } from "react";
import { RegistrationStatusContext } from "../../contexts/RegisterStatusContext.js";

export default function Register({ handleRegistration }) {
  const registrationFailed = useContext(RegistrationStatusContext);

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
      <div className="register__button-and-error-container">
        {registrationFailed && (
          <span className="register__registration-error-message">
            Este e-mail não está disponível
          </span>
        )}
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
