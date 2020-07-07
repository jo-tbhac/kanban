import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardLabelForm from './CardLabelForm';

const CARD_LABEL_FORM_WIDTH = 300;
const CARD_LABEL_FORM_BUTTON_HEIGHT = 30;

const CardLabelFormButton = () => {
  const [isCardLabelFormVisible, setCardLabelFormVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const closeCardLabelForm = useCallback(() => {
    setCardLabelFormVisible(false);
  }, []);

  const onClickButton = (event: React.MouseEvent) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    const clientRect = { top: top + CARD_LABEL_FORM_BUTTON_HEIGHT, left };
    const overflowElementX = window.innerWidth - (left + CARD_LABEL_FORM_WIDTH);

    if (overflowElementX < 0) {
      clientRect.left = left + overflowElementX;
    }
    setPosition(clientRect);
    setCardLabelFormVisible(true);
  };

  return (
    <div className="cardLabelFormButtonWrapper">
      <div
        data-testid="cardLabelFormButton"
        role="button"
        tabIndex={0}
        onClick={onClickButton}
        onKeyPress={() => setCardLabelFormVisible(true)}
        className="cardLabelFormButton"
      >
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </div>
      {isCardLabelFormVisible
        && <CardLabelForm position={position} closeCardLabelForm={closeCardLabelForm} />}
    </div>
  );
};

export default CardLabelFormButton;
