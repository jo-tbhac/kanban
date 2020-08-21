import React from 'react';

import { Card } from '../../store/card/types';
import CardStatus from './CardStatus';
import CardCheckListStatusIcon from './CardCheckListStatusIcon';
import CardFileStatusIcon from './CardFileStatusIcon';

type CardStatusIndexProps = {
  card: Card
}

const CardStatusIndex = (props: CardStatusIndexProps) => {
  const { card } = props;

  return (
    <div className="cardStatusIndex">
      {card.description !== '' && <CardStatus icon={['fas', 'align-left']} />}
      <CardCheckListStatusIcon card={card} />
      <CardFileStatusIcon card={card} />
    </div>
  );
};

export default CardStatusIndex;
