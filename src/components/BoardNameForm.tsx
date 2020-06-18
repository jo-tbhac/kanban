import React, { Dispatch, SetStateAction, useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as boardActions from '../store/board/actions';

const mapDispatchToProps = {
  updateBoard: boardActions.updateBoard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type BoardNameFormProps = PropsFromRedux&{
  setFormVisible: Dispatch<SetStateAction<boolean>>
  initialBoardName: string
}

export const BoardNameForm = (props: BoardNameFormProps) => {
  const { setFormVisible, initialBoardName, updateBoard } = props;

  const [boardName, setBoardName] = useState(initialBoardName);
  const { boardID } = useParams();

  const onBlur = () => {
    if (boardName === '' || boardName === initialBoardName) {
      setFormVisible(false);
      return;
    }

    const castedBoardID = Number(boardID);
    if (castedBoardID) {
      updateBoard({ name: boardName }, castedBoardID);
      setFormVisible(false);
    }
  };

  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      data-testid="boardNameForm"
      type="text"
      value={boardName}
      onChange={(event) => setBoardName(event.target.value)}
      onBlur={onBlur}
      className="boardNameForm"
    />
  );
};

export default connector(BoardNameForm);
