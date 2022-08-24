import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading}) {
   const [name, setName] = useState("");
   const [link, setLink] = useState("");

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleLinkChange(e) {
      setLink(e.target.value);
   }

   useEffect(() => {
      setName("");
      setLink("");
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onAddPlace(name, link);
   }

   return (
      <PopupWithForm
        title="Новое место"
        onClose={onClose}
        isOpen={isOpen}
        name={"edit_card"}
        buttonText="Создать"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        loadingButtonText="Сохранение..."
        >
        <input
            type="text"
            placeholder="Название"
            className="popup__input"
            id="new-title"
            name="name"
            minLength="2"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
        />
        <span 
            className="error-message error-message_visible"
            id="error-new-title"
        ></span>
        <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input"
            id="new-link"
            name="link"
            required
            value={link}
            onChange={handleLinkChange}
        />
        <span 
            className="error-message error-message_visible"
            id="error-new-link"
        ></span>
      </PopupWithForm>
   );
}

export default AddPlacePopup;