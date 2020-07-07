import React, { Dispatch, SetStateAction, useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as boardActions from '../store/board/actions';
import FlexTextField from './FlexTextField';

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
  const { boardId } = useParams();

  const onBlur = () => {
    if (boardName === '' || boardName === initialBoardName) {
      setFormVisible(false);
      return;
    }

    const castedBoardId = Number(boardId);
    if (castedBoardId) {
      updateBoard({ name: boardName }, castedBoardId);
      setFormVisible(false);
    }
  };

  return (
    <FlexTextField
      autoFocus
      value={boardName}
      onChange={(event) => setBoardName(event.target.value)}
      onBlur={onBlur}
    />
  );
};

export default connector(BoardNameForm);
