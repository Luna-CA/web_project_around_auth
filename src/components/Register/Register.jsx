import { useState } from "react";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inscrever-se</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth__input"
        />
        <button type="submit" className="auth__button">
          Inscrever-se
        </button>
      </form>
      <p className="auth__link-text">
        Já é membro?{" "}
        <Link to="/signin" className="auth__link">
          Faça login aqui!
        </Link>
      </p>
    </div>
  );
}

export default Register;
