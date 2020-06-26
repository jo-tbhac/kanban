import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardDescriptionForm from './CardDescriptionForm';
import CardDescriptionText from './CardDescriptionText';

const CardDescription = () => {
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
        <CardDescriptionForm closeCardDescriptionForm={closeCardDescriptionForm} />
      ) : (
        <CardDescriptionText openCardDescriptionForm={openCardDescriptionForm} />
      )}
    </div>
  );
};

export default CardDescription;
