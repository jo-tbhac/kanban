import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ToolBarProps = {
  boardName: string
}

const ToolBar: FC<ToolBarProps> = (props) => {
  const { boardName } = props;

  return (
    <div className="boardToolBar">
      <div className="boardToolBar__title">{boardName}</div>
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
