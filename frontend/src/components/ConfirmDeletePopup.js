import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpen, onClose, card, onCardDelete}) {
    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="edit_confirm"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default ConfirmDeletePopup;