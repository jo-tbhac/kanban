import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import usePreviousCount from '../../hooks/usePreviousCount';
import { RootState } from '../../store';
import { dialogTypeAsk } from '../../store/dialog/types';
import * as dialogActions from '../../store/dialog/actions';
import * as boardActions from '../../store/board/actions';
import { askBoardDeleteDialog, deleteBoardText } from '../../utils/text';
import BoardMenuRow from './BoardMenuRow';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    boards: board.boards,
  };
};

const mapDispatchToProps = {
  openDialog: dialogActions.openDialog,
  deleteBoard: boardActions.deleteBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const DeleteBoardButton = (props: PropsFromRedux) => {
  const { boards, openDialog, deleteBoard } = props;

  const { boardId } = useParams();
  const history = useHistory();
  const prevBoardsCount = usePreviousCount(boards.length);

  useEffect(() => {
    if (prevBoardsCount === undefined) {
      return;
    }

    if (prevBoardsCount > boards.length) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const onClick = () => {
    const castedBoardId = Number(boardId);
    if (!castedBoardId) {
      return;
    }

    openDialog({
      type: dialogTypeAsk,
      title: askBoardDeleteDialog,
      onConfirm: () => deleteBoard(castedBoardId),
    });
  };

  return <BoardMenuRow icon={['fas', 'trash-alt']} text={deleteBoardText} onClick={onClick} />;
};

export default connector(DeleteBoardButton);
