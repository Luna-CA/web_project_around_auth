import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from ".InfoTooltip.jsx";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch(() => {
          setLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then((res) => {
        setCurrentUser(res.data || res);
      });
    }
  }, [loggedIn]);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData.data || newData);
      });
    })();
  };

  // ROTEIRO 4 - Registro
  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // ROTEIRO 4 - Login
  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // ROTEIRO 5 - Sair
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* ROTEIRO 1 - Rotas */}
        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={() => setIsInfoTooltipOpen(false)}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
