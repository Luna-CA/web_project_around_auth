import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser } = userContext;

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    (e.preventDefault(), props.onUpdateUser({ name, about }));
  }

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_profile-name"
          id="profile-name"
          maxLength="30"
          minLength="1"
          name="profile-name"
          placeholder="Name"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_profile-description"
          id="profile-description"
          maxLength="30"
          minLength="1"
          name="profile-description"
          placeholder="Profession"
          required
          type="text"
          value={about}
          onChange={handleAboutChange}
        />
        <span className="popup__input-error profile-description-error"></span>
      </label>
      <button className="popup__submit" type="submit">
        Salvar
      </button>
    </form>
  );
}
