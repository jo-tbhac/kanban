import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = () => (
  <div className="card">
    <div className="cardLabelContainer">
      <div className="cardLabel" />
    </div>

    <div className="card__title">card_1</div>

    <div className="cardStatusContainer">
      <div className="cardStatus">
        <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardStatus__icon" />
        <div className="cardStatus__count">1</div>
      </div>
    </div>
  </div>
);

export default Card;
