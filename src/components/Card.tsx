import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as types from '../store/card/types';

type CardProps = {
  card: types.Card
}

const Card: FC<CardProps> = (props) => {
  const { card } = props;

  return (
    <div className="card">
      <div className="cardLabelContainer">
        {card.labels.map((label) => (
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
  );
};

export default Card;
