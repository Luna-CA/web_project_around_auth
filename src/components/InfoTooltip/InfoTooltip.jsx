import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose}>
          ×
        </button>
        <img
          className="popup__icon"
          src={isSuccess ? "/images/success.png" : "/images/error.png"}
          alt=""
        />
        <p className="popup__text">
          {isSuccess
            ? "Você acaba de se registrar!"
            : "Ops, algo deu errado! Por favor, tente novamente."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
