import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type CardStatusProps = {
  icon: IconProp
  className?: string
  count?: string
}

const CardStatus = (props: CardStatusProps) => {
  const { className, icon, count } = props;

  return (
    <div data-testid="cardStatus" className={className || 'cardStatus'}>
      <FontAwesomeIcon data-testid="cardStatusIcon" icon={icon} className="cardStatus__icon" />
      {count && <div data-testid="cardStatusCount" className="cardStatus__count">{count}</div>}
    </div>
  );
};

export default CardStatus;
