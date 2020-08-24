import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import BoardForm from './BoardForm';
import BoardIndexCard from './BoardIndexCard';
import { RootState } from '../../store';
import * as boardActions from '../../store/board/actions';
import * as routeActions from '../../store/route/actions';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    boards: board.boards,
  };
};

const mapDispatchToProps = {
  fetchAllBoards: boardActions.fetchAllBoards,
  initRedirectToBoardIndex: routeActions.initRedirectToBoardIndex,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const BoardIndex = (props: PropsFromRedux) => {
  const { boards, fetchAllBoards, initRedirectToBoardIndex } = props;

  useEffect(() => {
    initRedirectToBoardIndex();
    fetchAllBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boardIndexContainer" data-testid="boardIndexComponent">
      {boards.map((board) => <BoardIndexCard key={board.id} board={board} />)}
      <BoardForm />
    </div>
  );
};

export default connector(BoardIndex);
