import React, { Dispatch, SetStateAction } from 'react';

import { cardDescriptionPlaceholder } from '../utils/text';

type CardDescriptionTextProps = {
  cardDescription: string
  setCardDescriptionFormVisible: Dispatch<SetStateAction<boolean>>
}

const CardDescriptionText = (props: CardDescriptionTextProps) => {
  const { cardDescription, setCardDescriptionFormVisible } = props;

  return (
    cardDescription === '' ? (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCardDescriptionFormVisible(true)}
        onKeyPress={() => setCardDescriptionFormVisible(true)}
        className="cardDescriptionText__placeholder"
      >
        {cardDescriptionPlaceholder}
      </div>
    ) : (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCardDescriptionFormVisible(true)}
        onKeyPress={() => setCardDescriptionFormVisible(true)}
        className="cardDescriptionText__text"
      >
        {cardDescription}
      </div>
    )
  );
};

export default CardDescriptionText;
