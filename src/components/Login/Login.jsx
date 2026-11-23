import { useState } from "react";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Entrar</h2>
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
          Entrar
        </button>
      </form>
      <p className="auth__link-text">
        Ainda não é membro?{" "}
        <Link to="/signup" className="auth__link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
