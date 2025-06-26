import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin, onRedirectClick, authError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin({ email, password });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <label className="popup__label" htmlFor="login-email">
        Email
      </label>
      <input
        className={`popup__input ${emailError ? "popup__input_invalid" : ""}`}
        type="email"
        id="login-email"
        placeholder="Insira seu email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span className="popup__error" id="login-email-error">
        {emailError}
      </span>

      <label className="popup__label" htmlFor="login-password">
        Senha
      </label>
      <input
        className={`popup__input ${
          passwordError ? "popup__input_invalid" : ""
        }`}
        type="password"
        id="login-password"
        placeholder="Insira sua senha"
        value={password}
        onChange={handlePasswordChange}
        minLength="6"
        required
      />
      <span className="popup__error" id="login-password-error">
        {passwordError}
      </span>

      {authError && <span className="popup__auth-error">{authError}</span>}

      <button
        type="submit"
        className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
        disabled={!isValid}
      >
        Entrar
      </button>

      <div className="popup__redirect-link">
        ou{" "}
        <span className="popup__link" onClick={onRedirectClick}>
          Inscrever-se
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
