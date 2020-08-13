import React from 'react';
import { Link } from 'react-router-dom';

import { Board } from '../../store/board/types';

type BoardIndexCardProps = {
  board: Board
}

const BoardIndexCard = (props: BoardIndexCardProps) => {
  const { board } = props;

  return (
    <Link to={`/board/${board.id}`} key={board.id} className="boardIndexCard" data-testid="boardIndexCard">
      <div className="boardIndexCard__title">{board.name}</div>
    </Link>
  );
};

export default BoardIndexCard;
