import "./Login.css";
import { useInputValidator } from "../../utils/validators/inputValidator.js";

export default function Login({ handleLogin }) {
  const email = useInputValidator();
  const password = useInputValidator();

  const isFormValid =
    email.isValid &&
    email.value.length > 0 &&
    password.isValid &&
    password.value.length > 0;

  return (
    <>
      <form className="login__form" noValidate>
        <label className="login__email-input-label">
          Email
          <input
            className="login__email-input"
            type="email"
            placeholder="Insira seu email"
            onChange={email.handleChange}
            autoComplete="email"
          />
          {!email.isValid && (
            <span className="login__email-input-error-message">
              {email.errorMessage}
            </span>
          )}
        </label>

        <label className="login__password-input-label">
          Senha
          <input
            className="login__password-input"
            type="password"
            placeholder="Insira a senha"
            onChange={password.handleChange}
            minLength={8}
            maxLength={20}
            autoComplete="password"
          />
          {!password.isValid && (
            <span className="login__password-input-error-message">
              {password.errorMessage}
            </span>
          )}
        </label>
      </form>
      <button
        onClick={() => handleLogin(email.value, password.value)}
        className={isFormValid ? "login__button" : "login__button_disabled"}
      >
        Entrar
      </button>
    </>
  );
}
