import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ loggedIn, userEmail, onLogout }) {
  return (
    <header className="header">
      <img src="/images/logo.svg" alt="Logo" className="header__logo" />
      {loggedIn ? (
        <div className="header__user">
          <span className="header__email">{userEmail}</span>
          <button className="header__logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      ) : (
        <div className="header__auth">
          <Link to="/signin" className="header__link">
            Entrar
          </Link>
          <Link to="/signup" className="header__link">
            Cadastrar
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
