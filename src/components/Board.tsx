import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import ToolBar from './ToolBar';
import List from './List';
import ListForm from './ListForm';
import { RootState } from '../store';
import * as boardActions from '../store/board/actions';
import { newListButtonText } from '../utils/text';

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

export const Board = (props: PropsFromRedux) => {
  const { selectedBoard, fetchBoard } = props;

  const { boardID } = useParams();
  const [isListFormVisible, setListFormVisible] = useState(false);

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
        {selectedBoard.lists?.map((list) => <List key={String(list.id)} list={list} />)}

        {isListFormVisible ? (
          <ListForm setListFormVisible={setListFormVisible} />
        ) : (
          <div
            data-testid="addListButton"
            role="button"
            tabIndex={0}
            onClick={() => setListFormVisible(true)}
            onKeyPress={() => setListFormVisible(true)}
            className="addListButton"
          >
            <FontAwesomeIcon icon={['fas', 'plus']} className="addListButton__icon" />
            <div className="addListButton__text">{newListButtonText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connector(Board);
