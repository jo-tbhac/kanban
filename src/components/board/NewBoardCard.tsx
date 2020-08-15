import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { newBoardFormTitle } from '../../utils/text';

type NewBoardCardProps = {
  showForm: () => void
}

const NewBoardCard = (props: NewBoardCardProps) => {
  const { showForm } = props;

  return (
    <div
      data-testid="newBoardCard"
      role="button"
      tabIndex={0}
      onClick={showForm}
      onKeyPress={showForm}
      className="newBoardCard"
    >
      <div className="newBoardCard__label">{newBoardFormTitle}</div>
      <FontAwesomeIcon icon={['fas', 'plus']} />
    </div>
  );
};

export default NewBoardCard;
