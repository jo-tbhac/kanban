import React, { useState } from 'react';

import BoardNameForm from '../board/BoardNameForm';
import LabelIndex from '../label/LabelIndex';

type ToolBarProps = {
  boardName: string
}

const ToolBar = React.memo((props: ToolBarProps) => {
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
});

export default ToolBar;
