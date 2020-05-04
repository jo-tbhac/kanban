import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ToolBar from './ToolBar';
import List from './List';

const Board = () => (
  <div className="boardContainer">
    <ToolBar />

    <div className="listIndexContainer">
      <List />

      <div className="addListButton">
        <FontAwesomeIcon icon={['fas', 'plus']} className="addListButton__icon" />
        <div className="addListButton__text">Add list</div>
      </div>
    </div>
  </div>
);

export default Board;
