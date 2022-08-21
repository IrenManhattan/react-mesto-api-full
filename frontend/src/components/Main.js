import React, {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete,  onConfirmDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-button" type="button" aria-label="Сменить_аватар" onClick={onEditAvatar}>
          <img className="profile__photo" src={currentUser.avatar} alt="Аватар"/>
         </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__prof">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} 
                card={card} 
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onConfirmDelete={onConfirmDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;