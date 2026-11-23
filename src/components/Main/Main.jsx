import { useState, useContext, useEffect } from "react";
import Popup from "./components/Popup/Popup";
import api from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import { ImagePopup } from "./components/Popup/components/ImagePopup/ImagePopup";
import Card from "./components/Card/Card";

export default function Main() {
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const newCardPopup = {
    title: "New card",
    children: <NewCard onAddCard={handleCreateCard} />,
  };
  const editProfilePopup = {
    title: "Edit profile",
    children: <EditProfile onUpdateUser={handleUpdateUser} />,
  };
  const editAvatarPopup = {
    title: "Edit avatar",
    children: <EditAvatar onUpdateAvatar={handleUpdateAvatar} />,
  };
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleCreateCard(data) {
    api.addCard(data.name, data.link).then((newCard) => {
      setCards((prevCards) => [...prevCards, newCard]);
      handleClosePopup();
    });
  }

  function handleCardClick(card) {
    setPopup({
      children: <ImagePopup card={card} onClose={handleClosePopup} />,
    });
  }

  useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((prevCards) =>
        prevCards.map((i) => {
          if (i._id === newCard._id) {
            return newCard;
          }
          return i;
        }),
      );
    });
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data.link).then((newUser) => {
      setCurrentUser(newUser);
      handleClosePopup();
    });
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data.name, data.about).then((newUser) => {
      setCurrentUser(newUser);
      handleClosePopup();
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((prevCards) =>
        prevCards.filter((currentCard) => card._id !== currentCard._id),
      );
    });
  }

  return (
    <main className="content page__content">
      <section className="profile page__section">
        <div className="profile profile__avatar">
          <button
            aria-label="Editar avatar"
            className="profile__avatar-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Avatar"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
