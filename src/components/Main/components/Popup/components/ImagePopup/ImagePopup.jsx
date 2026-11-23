export function ImagePopup({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div className="popup__content popup__content_type_image">
      <img src={card.link} alt={card.name} className="popup__image" />
      <p className="popup__caption">{card.name}</p>
    </div>
  );
}
