import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BoardNameForm from './BoardNameForm';

type ToolBarProps = {
  boardName: string
}

const ToolBar: FC<ToolBarProps> = (props) => {
  const { boardName } = props;

  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div className="boardToolBar">
      {isFormVisible ? (
        <BoardNameForm initialBoardName={boardName} setFormVisible={() => setFormVisible(false)} />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setFormVisible(true)}
          onKeyPress={() => setFormVisible(true)}
          className="boardToolBar__title"
        >
          {boardName}
        </div>
      )}
      <div className="labelContainer">
        <div className="label">
          <div className="label__icon" />
        </div>
        <div className="label">
          <div className="label__icon" />
        </div>
      </div>
      <div className="addLabelButton">
        <FontAwesomeIcon icon={['fas', 'plus']} className="addLabelButton__icon" />
        <div className="addLabelButton__text">Add label</div>
      </div>
    </div>
  );
};

export default ToolBar;
