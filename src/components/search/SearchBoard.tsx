import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import BoardIndexCard from '../board/BoardIndexCard';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    boards: board.boards,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type SearchBoardProps = PropsFromRedux & {
  boardId: number
}

const SearchBoard = (props: SearchBoardProps) => {
  const { boards, boardId } = props;

  const board = boards.find((b) => b.id === boardId);

  if (!board) {
    return null;
  }

  return (
    <div className="searchBoard">
      <BoardIndexCard board={board} />
    </div>
  );
};

export default connector(SearchBoard);
