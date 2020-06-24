import React from 'react';

import { cardDescriptionPlaceholder } from '../utils/text';

type CardDescriptionTextProps = {
  cardDescription: string
  openCardDescriptionForm: () => void
}

const CardDescriptionText = (props: CardDescriptionTextProps) => {
  const { cardDescription, openCardDescriptionForm } = props;

  return (
    cardDescription === '' ? (
      <div
        data-testid="cardDescriptionTextPlaceholer"
        role="button"
        tabIndex={0}
        onClick={openCardDescriptionForm}
        onKeyPress={openCardDescriptionForm}
        className="cardDescriptionText__placeholder"
      >
        {cardDescriptionPlaceholder}
      </div>
    ) : (
      <div
        data-testid="cardDescriptionText"
        role="button"
        tabIndex={0}
        onClick={openCardDescriptionForm}
        onKeyPress={openCardDescriptionForm}
        className="cardDescriptionText__text"
      >
        {cardDescription}
      </div>
    )
  );
};

export default CardDescriptionText;
