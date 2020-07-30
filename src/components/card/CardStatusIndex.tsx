import React, { useContext } from 'react';

import { CardContext } from './CardIndexContainer';
import CardStatus from './CardStatus';
import CardCheckListStatusIcon from './CardCheckListStatusIcon';

const CardStatusIndex = () => {
  const card = useContext(CardContext);

  if (!card) {
    return null;
  }

  return (
    <div className="cardStatusIndex">
      {card.description !== '' && <CardStatus icon={['fas', 'align-left']} />}
      <CardCheckListStatusIcon />
    </div>
  );
};

export default CardStatusIndex;
