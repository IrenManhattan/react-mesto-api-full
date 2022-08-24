import React from "react";


const InfoTooltip = ({ isOpen, onClose, imgInfo, textInfo }) => {
   return (
      <div className={`popup ${isOpen && "popup_opened"}`}>
         <div className="popup__container popup__container_tooltip">
            <button
               type="button"
               className="popup__exit"
               onClick={onClose}
            ></button>
            <img
               src={imgInfo}
               alt="info"
            />
            <p className="popup__profile-tooltip">
               {textInfo}
            </p>
         </div>
      </div>
   );
};

export default InfoTooltip;
