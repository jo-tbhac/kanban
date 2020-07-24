import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type CardSideBarButtonProps = {
  text: string
  icon: IconProp
  onClick: () => void
}

const CardSideBarButton = (props: CardSideBarButtonProps) => {
  const { text, icon, onClick } = props;

  return (
    <div
      data-testid="cardSideBarButton"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="cardSideBarButton"
    >
      <FontAwesomeIcon icon={icon} className="cardSideBarButton__icon" />
      <div className="cardSideBarButton__label">{text}</div>
    </div>
  );
};

export default CardSideBarButton;
