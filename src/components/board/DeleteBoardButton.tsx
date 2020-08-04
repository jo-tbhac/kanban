import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteMatch, useHistory } from 'react-router-dom';

import usePreviousCount from '../../hooks/usePreviousCount';
import { RootState } from '../../store';
import { dialogTypeAsk } from '../../store/dialog/types';
import * as dialogActions from '../../store/dialog/actions';
import * as boardActions from '../../store/board/actions';
import { askBoardDeleteDialog, deleteBoardText } from '../../utils/text';

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

const DeleteBoardButton = (props: PropsFromRedux) => {
  const { boards, openDialog, deleteBoard } = props;

  const match = useRouteMatch<{ boardId: string }>('/board/:boardId');
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

  if (!match) {
    return null;
  }

  const onClick = () => {
    const castedBoardId = Number(match.params.boardId);
    if (!castedBoardId) {
      return;
    }

    openDialog({
      type: dialogTypeAsk,
      title: askBoardDeleteDialog,
      onConfirm: () => deleteBoard(castedBoardId),
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="deleteBoardButton"
    >
      <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      <div className="deleteBoardButton__text">{deleteBoardText}</div>
    </div>
  );
};

export default connector(DeleteBoardButton);
