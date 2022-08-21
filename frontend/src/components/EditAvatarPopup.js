import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
   const avatarRef = useRef();

   useEffect(() => {
      avatarRef.current.value = "";
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateAvatar({
         avatar: avatarRef.current.value,
      });
   }

   return (
      <PopupWithForm
        title="Обновить аватар"
        onClose={onClose}
        isOpen={isOpen}
        name="avatar"
        buttonText="Сохранить"
        loadingButtonText="Сохранение..."
        onSubmit={handleSubmit}
        isLoading={isLoading}

        >
        <input
            type="url"
            placeholder="Ссылка на аватар"
            className="popup__input"
            id="new-link-avatar"
            name="avatar"
            required
            ref={avatarRef}
        />
        <span 
            className="error-message error-message_visible"
            id="error-new-link-avatar"
        ></span>
      </PopupWithForm>
   );
}

export default EditAvatarPopup;