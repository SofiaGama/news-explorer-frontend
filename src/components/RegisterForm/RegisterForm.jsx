import { useState } from "react";
import "./RegisterForm.css";

function RegisterForm({ onRegister, onRedirectClick, authError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.validity.valid) {
      setEmailError(e.target.validationMessage);
    } else {
      setEmailError("");
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.validity.valid) {
      setPasswordError(e.target.validationMessage);
    } else {
      setPasswordError("");
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (!e.target.validity.valid) {
      setUsernameError(e.target.validationMessage);
    } else {
      setUsernameError("");
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister({ email, password, name: username });
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label" htmlFor="register-email">
        Email
      </label>
      <input
        className={`popup__input ${emailError ? "popup__input_invalid" : ""}`}
        type="email"
        id="register-email"
        placeholder="Insira seu email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span className="popup__error" id="register-email-error">
        {emailError}
      </span>

      <label className="popup__label" htmlFor="register-password">
        Senha
      </label>
      <input
        className={`popup__input ${
          passwordError ? "popup__input_invalid" : ""
        }`}
        type="password"
        id="register-password"
        placeholder="Insira sua senha"
        value={password}
        onChange={handlePasswordChange}
        minLength="6"
        required
      />
      <span className="popup__error" id="register-password-error">
        {passwordError}
      </span>

      <label className="popup__label" htmlFor="register-username">
        Nome de Usuário
      </label>
      <input
        className={`popup__input ${
          usernameError ? "popup__input_invalid" : ""
        }`}
        type="text"
        id="register-username"
        placeholder="Insira seu nome de usuário"
        value={username}
        onChange={handleUsernameChange}
        minLength="2"
        required
      />
      <span className="popup__error" id="register-username-error">
        {usernameError}
      </span>

      {authError && <span className="popup__auth-error">{authError}</span>}

      <button
        type="submit"
        className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
        disabled={!isValid}
      >
        Inscrever-se
      </button>

      <div className="popup__redirect-link">
        ou{" "}
        <span className="popup__link" onClick={onRedirectClick}>
          Entrar
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
