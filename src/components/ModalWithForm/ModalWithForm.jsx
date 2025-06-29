import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close.svg";

function ModalWithForm({ children, title, name, isOpen, onClose }) {
  React.useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      id={`modal-${name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Fechar" />
        </button>
        <h3 className="modal__title">{title}</h3>
        <div className="modal__form">{children}</div>
      </div>
    </div>
  );
}

export default ModalWithForm;
