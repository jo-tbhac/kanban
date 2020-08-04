import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteMatch } from 'react-router-dom';

import LabelEdit from './LabelEdit';
import { editLabelButtonText } from '../../utils/text';


const EditLabelButton = () => {
  const [isLabelEditVisible, setLabelEditVisible] = useState(false);

  const match = useRouteMatch('/board/:boardId');

  if (!match) {
    return null;
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLabelEditVisible(true)}
        onKeyPress={() => setLabelEditVisible(true)}
        className="editLabelButton"
      >
        <FontAwesomeIcon icon={['fas', 'pen']} />
        <div className="editLabelButton__text">{editLabelButtonText}</div>
      </div>
      {isLabelEditVisible && <LabelEdit setLabelEditVisible={setLabelEditVisible} />}
    </>
  );
};

export default EditLabelButton;
