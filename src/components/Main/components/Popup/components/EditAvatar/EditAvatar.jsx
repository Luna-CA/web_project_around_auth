import { useState } from "react";

export default function EditAvatar(props) {
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ link });
  }
  return (
    <form
      className="popup__form"
      id="avatar-form"
      name="edit-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_type_url"
          id="avatar-image"
          name="avatar-image"
          placeholder="Image Link"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error add-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
