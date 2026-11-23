import { useState } from "react";

export default function NewCard(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({ name, link });
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input"
          id="new-card-name"
          name="name"
          placeholder="Nome"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          id="new-card-link"
          name="link"
          placeholder="link"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error profile-description-error"></span>
      </label>
      <button type="submit" className="popup__submit">
        Salvar
      </button>
    </form>
  );
}
