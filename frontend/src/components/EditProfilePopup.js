import React, {useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleJobChange(e) {
      setDescription(e.target.value);
   }

   const currentUser = useContext(CurrentUserContext);

   useEffect(() => {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
   }, [currentUser, isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateUser( name, description );
   }

   return (
    <PopupWithForm
      title="Редактировать профиль"
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isOpen={isOpen}
      name="profile"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
    >
      <input
        type="text"
        id="new-name"
        placeholder="Имя"
        className="popup__input"
        name="name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}              
      />
      <span 
        className="error-message error-message_visible"
        id="error-new-name"
      ></span>
      <input
        type="text"
        placeholder="Вид деятельности"
        className="popup__input"
        id="new-profession"
        name="about"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleJobChange}
      />
      <span 
        className="error-message error-message_visible"
        id="error-new-profession"
      ></span>
    </PopupWithForm>
   )
   }

export default EditProfilePopup;