import React from 'react';

function ImagePopup(props) {
  return (
    <div
    className={`popup ${props.card.name && "popup_opened"
        }`}
>
    <div className="popup__image-container">
        <button
            className="popup__exit"
            type="button"
            onClick={props.onClose}
        ></button>
        <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
        />
        <h2 className="popup__image-title">{props.card.name}</h2>
    </div>
</div>
  );
}

export default ImagePopup;