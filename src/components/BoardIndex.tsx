import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import BoardForm from './BoardForm';
import { RootState } from '../store';
import * as boardActions from '../store/board/actions';
import { formatRFC3339DateString } from '../utils/utils';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    boards: board.boards,
  };
};

const mapDispatchToProps = {
  fetchAllBoards: boardActions.fetchAllBoards,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const BoardIndex = (props: PropsFromRedux) => {
  const { boards, fetchAllBoards } = props;

  useEffect(() => {
    fetchAllBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boardIndexContainer" data-testid="boardIndexComponent">
      {boards.map((board) => (
        <Link to={`/board/${board.id}`} key={board.id} className="boardIndexCard" data-testid="boardIndexCard">
          <div className="boardIndexCardTop">
            <div className="boardIndexCardTop__title">{board.name}</div>
          </div>
          <div className="boardIndexCardBottom">
            <div className="boardIndexCardBottom__label">Updated at</div>
            <div>{formatRFC3339DateString(board.updatedAt)}</div>
          </div>
        </Link>
      ))}
      <BoardForm />
    </div>
  );
};

export default connector(BoardIndex);
