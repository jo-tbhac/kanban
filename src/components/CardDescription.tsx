import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardDescriptionForm from './CardDescriptionForm';
import CardDescriptionText from './CardDescriptionText';

type CardDescriptionProps = {
  cardDescription: string
  cardID: number
}

const CardDescription = (props: CardDescriptionProps) => {
  const { cardDescription, cardID } = props;

  const [isCardDescriptionFormVisible, setCardDescriptionFormVisible] = useState(false);

  const closeCardDescriptionForm = useCallback(() => {
    setCardDescriptionFormVisible(false);
  }, []);

  const openCardDescriptionForm = useCallback(() => {
    setCardDescriptionFormVisible(true);
  }, []);

  return (
    <div className="cardDescription">
      <div className="cardDescriptionHeader">
        <div className="cardDescriptionHeader__label">説明</div>
        <div
          role="button"
          tabIndex={0}
          onClick={openCardDescriptionForm}
          onKeyPress={openCardDescriptionForm}
          className="cardDescriptionHeader__icon"
        >
          <FontAwesomeIcon icon={['fas', 'pen']} />
        </div>
      </div>
      {isCardDescriptionFormVisible ? (
        <CardDescriptionForm
          cardID={cardID}
          initialCardDescription={cardDescription}
          closeCardDescriptionForm={closeCardDescriptionForm}
        />
      ) : (
        <CardDescriptionText
          cardDescription={cardDescription}
          openCardDescriptionForm={openCardDescriptionForm}
        />
      )}
    </div>
  );
};

export default CardDescription;
