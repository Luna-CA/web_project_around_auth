import { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children } = props;

  function handleContentClick(event) {
    event.stopPropagation();
  }

  function handleEscClose(event) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <div className="popup" onClick={onClose}>
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
        onClick={handleContentClick}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
