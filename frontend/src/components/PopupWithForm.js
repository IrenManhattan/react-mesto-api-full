import React from 'react';

function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit, isLoading, loadingButtonText }) {

  return (
    <div className={`popup ${isOpen && "popup_opened"}`} id={`popup__${name}`} 
         onClick={e => (e.currentTarget === e.target) && onClose()}>
      <div className="popup__container" id={`popup__container-${name}`}>
        <button type="button" 
            className="popup__exit" 
            id={`popup__exit_${name}`}
            onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form 
            className="popup__form" 
            name={name} 
            id={`${name}_form`} 
            onSubmit={onSubmit}
          >
            {children}
          <button 
          type="submit" 
          className="popup__button" 
          >
          { isLoading ? loadingButtonText : buttonText }
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm