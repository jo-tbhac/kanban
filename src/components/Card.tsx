import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CardContext } from './List';
import CardDetail from './CardDetail';
import CardLabelSmall from './CardLabelSmall';

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
        <div className="cardLabelWrapper">
          {card?.labels?.map((label) => (
            <CardLabelSmall key={`${card.id}-${label.id}`} label={label} />
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
