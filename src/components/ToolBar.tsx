import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToolBar = () => (
  <div className="boardToolBar">
    <div className="boardToolBar__title">board_1</div>
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

export default ToolBar;
