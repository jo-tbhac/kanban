import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardLabelForm from './CardLabelForm';

const CardLabelFormButton = () => {
  const [isCardLabelFormVisible, setCardLabelFormVisible] = useState(false);

  const closeCardLabelForm = useCallback(() => {
    setCardLabelFormVisible(false);
  }, []);

  return (
    <div className="cardLabelFormButtonWrapper">
      <div
        data-testid="cardLabelFormButton"
        role="button"
        tabIndex={0}
        onClick={() => setCardLabelFormVisible(true)}
        onKeyPress={() => setCardLabelFormVisible(true)}
        className="cardLabelFormButton"
      >
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </div>
      {isCardLabelFormVisible
        && <CardLabelForm closeCardLabelForm={closeCardLabelForm} />}
    </div>
  );
};

export default CardLabelFormButton;
