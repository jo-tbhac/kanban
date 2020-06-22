import React, { useState } from 'react';
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

  return (
    <div className="cardDescription">
      <div className="cardDescriptionHeader">
        <div className="cardDescriptionHeader__label">説明</div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setCardDescriptionFormVisible(true)}
          onKeyPress={() => setCardDescriptionFormVisible(true)}
          className="cardDescriptionHeader__icon"
        >
          <FontAwesomeIcon icon={['fas', 'pen']} />
        </div>
      </div>
      {isCardDescriptionFormVisible ? (
        <CardDescriptionForm
          cardID={cardID}
          initialCardDescription={cardDescription}
          setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        />
      ) : (
        <CardDescriptionText
          cardDescription={cardDescription}
          setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        />
      )}
    </div>
  );
};

export default CardDescription;
