import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

import EditAvatar from "./Main/components/Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "./Main/components/Popup/components/EditProfile/EditProfile.jsx";
import NewCard from "./Main/components/Popup/components/NewCard/NewCard.jsx";
import { ImagePopup } from "./Main/components/Popup/components/ImagePopup/ImagePopup.jsx";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserEmail(res.data?.email || res.email);
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
      Promise.all([api.getUserInfo(), api.getCards()]).then(
        ([userData, cardsData]) => {
          setCurrentUser(userData.data || userData);
          setCards(cardsData.data || cardsData);
        },
      );
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedCard(null);
  }

  // Funções dos botões - era isso que estava faltando
  function handleUpdateUser(data) {
    api.updateUserInfo(data).then((newData) => {
      setCurrentUser(newData.data || newData);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data.link || data).then((newData) => {
      setCurrentUser(newData.data || newData);
      closeAllPopups();
    });
  }

  function handleAddPlace(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard.data || newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards(
        cards.map((c) => (c._id === card._id ? newCard.data || newCard : c)),
      );
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
    });
  }

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
    setCards([]);
    setCurrentUser({});
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
                <Main
                  cards={cards}
                  onEditAvatar={() => setIsEditAvatarOpen(true)}
                  onEditProfile={() => setIsEditProfileOpen(true)}
                  onAddPlace={() => setIsAddPlaceOpen(true)}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
