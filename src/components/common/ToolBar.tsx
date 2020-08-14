import React, { useState, useContext } from 'react';

import { darkTheme } from '../../store/background_image/types';
import { fontColorDark, fontColorLight } from '../../utils/utils';
import { ThemeContext } from '../board/BoardWrapper';
import BoardNameForm from '../board/BoardNameForm';
import LabelIndex from '../label/LabelIndex';

type ToolBarProps = {
  boardName: string
}

const ToolBar = React.memo((props: ToolBarProps) => {
  const { boardName } = props;

  const [isFormVisible, setFormVisible] = useState(false);

  const theme = useContext(ThemeContext);

  const style = {
    color: theme === darkTheme ? fontColorDark : fontColorLight,
  };

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
          style={style}
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
