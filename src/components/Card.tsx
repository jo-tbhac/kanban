import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardDetail from './CardDetail';
import * as types from '../store/card/types';

type CardProps = {
  card: types.Card
}

const Card = (props: CardProps) => {
  const { card } = props;

  const [isCardDetailVisible, setCardDetailVisible] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCardDetailVisible(true)}
        onKeyPress={() => setCardDetailVisible(true)}
        className="card"
      >
        <div className="cardLabelContainer">
          {card.labels?.map((label) => (
            <div
              key={`${card.id}-${label.id}`}
              style={{ backgroundColor: label.color }}
              className="cardLabel"
            />
          ))}
        </div>

        <div className="card__title">{card.title}</div>

        <div className="cardStatusContainer">
          <div className="cardStatus">
            <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardStatus__icon" />
            <div className="cardStatus__count">1</div>
          </div>
        </div>
      </div>
      {isCardDetailVisible
        && <CardDetail card={card} setCardDetailVisible={setCardDetailVisible} />}
    </>
  );
};

export default Card;
