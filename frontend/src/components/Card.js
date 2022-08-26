import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
       `element__delete ${isOwn ? '' : 'element__delete_hidden'}`
    );
    
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
       `element__like ${isLiked && 'element__like_active'}`
    );

    const handleClick = () => {
        onCardClick(card);
     }
  
     const handleLikeClick = () => {
        onCardLike(card);
     }
  
     const handleDeleteClick = () => {
        onCardDelete(card);
     }
  
   return (
    <article className="element">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="element__caption">
            <h2 className="element__text">{card.name}</h2>
            <div className="element__like-container">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <span className="element__like-count">{card.likes.length}</span>
            </div>
        </div>
    </article>
);
}

export default Card;



