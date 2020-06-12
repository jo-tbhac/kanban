import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../store';
import * as boardActions from '../store/board/actions';
import {
  newBoardFormTitle,
  boardNameFormPlaceholder,
  createButtonText,
  cancelButtonText,
} from '../utils/text';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    boards: board.boards,
  };
};

const mapDispatchToProps = {
  createBoard: boardActions.createBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const usePreviousBoardCount = (count: number) => {
  const ref: {current: number | undefined} = useRef();
  useEffect(() => {
    ref.current = count;
  });
  return ref.current;
};

const BoardForm = (props: PropsFromRedux) => {
  const { createBoard, boards } = props;
  const prevBoardsCount = usePreviousBoardCount(boards.length);

  const [boardName, setBoardName] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const history = useHistory();
  const isCompleteFetchBoards = useRef(true);

  useEffect(() => {
    if (prevBoardsCount === undefined) {
      return;
    }

    if (isCompleteFetchBoards.current) {
      isCompleteFetchBoards.current = false;
      return;
    }

    const len = boards.length;
    if (prevBoardsCount < len) {
      const boardId = boards[len - 1].id;
      history.push(`/board/${boardId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const onClickSubmit = () => {
    const params = { name: boardName };
    createBoard(params);
  };

  const onCancel = () => {
    setBoardName('');
    setFormVisible(false);
  };

  return (
    isFormVisible ? (
      <div className="boardFormCard">
        <div className="boardFormCardInput">
          <input
            type="text"
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
            className="boardFormCardInput__title"
            placeholder={boardNameFormPlaceholder}
          />
        </div>
        <div className="boardFormCardButton">
          <button type="button" onClick={onCancel} className="boardFormCardButton__cancel">
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={onClickSubmit}
            className="boardFormCardButton__submit"
            disabled={boardName === ''}
          >
            {createButtonText}
          </button>
        </div>
      </div>
    ) : (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setFormVisible(true)}
        onKeyPress={() => setFormVisible(true)}
        className="boardFormNew"
      >
        <div className="boardFormNew__label">{newBoardFormTitle}</div>
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </div>
    )
  );
};

export default connector(BoardForm);
