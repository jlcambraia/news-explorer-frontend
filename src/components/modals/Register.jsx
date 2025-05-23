import "./Register.css";
import { useInputValidator } from "../../utils/validators/inputValidator.js";

import { useContext } from "react";
import { RegistrationStatusContext } from "../../contexts/RegisterStatusContext.js";

export default function Register({ handleRegistration }) {
  const email = useInputValidator();
  const password = useInputValidator();
  const username = useInputValidator();

  const isFormValid =
    email.isValid &&
    email.value.length > 0 &&
    password.isValid &&
    password.value.length > 0 &&
    username.isValid &&
    username.value.length > 0;

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
            onChange={email.handleChange}
            autoComplete="email"
          />
          {!email.isValid && (
            <span className="register__email-input-error-message">
              {email.errorMessage}
            </span>
          )}
        </label>

        <label className="register__password-input-label">
          Senha
          <input
            className="register__password-input"
            type="password"
            placeholder="Insira a senha"
            onChange={password.handleChange}
            minLength={8}
            maxLength={20}
            autoComplete="password"
          />
          {!password.isValid && (
            <span className="register__password-input-error-message">
              {password.errorMessage}
            </span>
          )}
        </label>

        <label className="register__username-input-label">
          Nome de usuário
          <input
            className="register__username-input"
            type="text"
            placeholder="Insira seu nome de usuário"
            onChange={username.handleChange}
            minLength={2}
            maxLength={30}
          />
          {!username.isValid && (
            <span className="register__username-input-error-message">
              {username.errorMessage}
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
            handleRegistration(email.value, password.value, username.value)
          }
          className={
            isFormValid ? "register__button" : "register__button_disabled"
          }
        >
          Inscrever-se
        </button>
      </div>
    </>
  );
}
