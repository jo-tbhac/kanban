import React, { useContext } from 'react';

import CardContext from '../../context/CardContext';
import CardLabel from './CardLabel';
import CardLabelFormButton from './CardLabelFormButton';

const CardLabelContainer = () => {
  const card = useContext(CardContext);

  return (
    <div className="cardLabelContainer">
      <div className="cardLabelContainer__label">ラベル</div>
      <div className="cardLabelIndex">
        {card?.labels?.map((label) => <CardLabel key={label.id} label={label} />)}
        <CardLabelFormButton />
      </div>
    </div>
  );
};

export default CardLabelContainer;
