import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import ToolBar from './ToolBar';
import List from './List';
import { RootState } from '../store';
import * as boardActions from '../store/board/actions';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    selectedBoard: board.selectedBoard,
  };
};

const mapDispatchToProps = {
  fetchBoard: boardActions.fetchBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Board = (props: PropsFromRedux) => {
  const { selectedBoard, fetchBoard } = props;
  const { boardID } = useParams();

  useEffect(() => {
    if (boardID && Number(boardID)) {
      fetchBoard(Number(boardID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boardContainer" data-testid="boardComponent">
      <ToolBar boardName={selectedBoard.name} />

      <div className="listIndexContainer">
        {selectedBoard.lists.map((list) => <List key={String(list.id)} list={list} />)}

        <div className="addListButton">
          <FontAwesomeIcon icon={['fas', 'plus']} className="addListButton__icon" />
          <div className="addListButton__text">Add list</div>
        </div>
      </div>
    </div>
  );
};

export default connector(Board);
