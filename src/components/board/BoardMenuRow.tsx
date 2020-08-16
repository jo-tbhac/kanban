import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type BoardMenuRowProps = {
  icon: IconProp
  text: string
  onClick: () => void
}

const BoardMenuRow = (props: BoardMenuRowProps) => {
  const { icon, text, onClick } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="boardMenuRow"
    >
      <FontAwesomeIcon icon={icon} />
      <div className="boardMenuRow__text">{text}</div>
    </div>
  );
};

export default BoardMenuRow;
