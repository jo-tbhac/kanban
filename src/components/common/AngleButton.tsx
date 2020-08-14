import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type AngleButtonProps = {
  icon: IconProp
  onClick: () => void
  disabled?: boolean
}

const AngleButton = (props: AngleButtonProps) => {
  const { icon, onClick, disabled } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="angleButton"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default AngleButton;
