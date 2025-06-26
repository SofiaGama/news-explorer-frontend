import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./PopupWithForm.css";

function PopupWithForm({ name, title, isOpen, onClose, children }) {
  return (
    <ModalWithForm name={name} title={title} isOpen={isOpen} onClose={onClose}>
      {children}
    </ModalWithForm>
  );
}

export default PopupWithForm;
