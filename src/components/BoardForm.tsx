import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  newBoardFormTitle,
  boardNameFormPlaceholder,
  createButtonText,
  cancelButtonText,
} from '../utils/text';

const BoardForm = () => {
  const [boardName, setBoardName] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    isFormVisible ? (
      <div className="boardFormCard">
        <div className="boardFormCardInput">
          <input
            type="text"
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
            className="boardFormCardInput__title"
            placeholder={boardNameFormPlaceholder}
          />
        </div>
        <div className="boardFormCardButton">
          <button
            type="button"
            onClick={() => setFormVisible(false)}
            className="boardFormCardButton__cancel"
          >
            {cancelButtonText}
          </button>
          <button type="button" className="boardFormCardButton__submit">{createButtonText}</button>
        </div>
      </div>
    ) : (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setFormVisible(true)}
        onKeyPress={() => setFormVisible(true)}
        className="boardFormNew"
      >
        <div className="boardFormNew__label">{newBoardFormTitle}</div>
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </div>
    )
  );
};

export default BoardForm;
