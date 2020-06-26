import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CardContext } from './List';
import CardDetail from './CardDetail';

const Card = () => {
  const card = useContext(CardContext);

  const [isCardDetailVisible, setCardDetailVisible] = useState(false);

  return (
    <>
      <div
        data-testid="card"
        role="button"
        tabIndex={0}
        onClick={() => setCardDetailVisible(true)}
        onKeyPress={() => setCardDetailVisible(true)}
        className="card"
      >
        <div className="cardLabelContainer">
          {card?.labels?.map((label) => (
            <div
              key={`${card.id}-${label.id}`}
              style={{ backgroundColor: label.color }}
              className="cardLabel"
            />
          ))}
        </div>

        <div className="card__title">{card?.title}</div>

        <div className="cardStatusContainer">
          <div className="cardStatus">
            <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardStatus__icon" />
            <div className="cardStatus__count">1</div>
          </div>
        </div>
      </div>
      {isCardDetailVisible
        && <CardDetail setCardDetailVisible={setCardDetailVisible} />}
    </>
  );
};

export default Card;
