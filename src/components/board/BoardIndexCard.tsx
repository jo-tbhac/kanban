import React from 'react';
import { Link } from 'react-router-dom';

import { Board } from '../../store/board/types';
import { formatRFC3339DateString } from '../../utils/utils';

type BoardIndexCardProps = {
  board: Board
}

export const BoardIndexCard = (props: BoardIndexCardProps) => {
  const { board } = props;

  return (
    <Link to={`/board/${board.id}`} key={board.id} className="boardIndexCard" data-testid="boardIndexCard">
      <div className="boardIndexCardTop">
        <div className="boardIndexCardTop__title">{board.name}</div>
      </div>
      <div className="boardIndexCardBottom">
        <div className="boardIndexCardBottom__label">Updated at</div>
        <div>{formatRFC3339DateString(board.updatedAt)}</div>
      </div>
    </Link>
  );
};

export default BoardIndexCard;
