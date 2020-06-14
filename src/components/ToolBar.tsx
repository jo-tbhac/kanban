import React, { FC, useState } from 'react';

import BoardNameForm from './BoardNameForm';
import LabelIndex from './LabelIndex';

type ToolBarProps = {
  boardName: string
}

const ToolBar: FC<ToolBarProps> = (props) => {
  const { boardName } = props;

  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div className="boardToolBar">
      {isFormVisible ? (
        <BoardNameForm initialBoardName={boardName} setFormVisible={setFormVisible} />
      ) : (
        <div
          data-testid="boardName"
          role="button"
          tabIndex={0}
          onClick={() => setFormVisible(true)}
          onKeyPress={() => setFormVisible(true)}
          className="boardToolBar__title"
        >
          {boardName}
        </div>
      )}
      <LabelIndex />
    </div>
  );
};

export default ToolBar;
