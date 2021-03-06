import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import ToolBar from '../common/ToolBar';
import List from '../list/List';
import ListForm from '../list/ListForm';
import CardDetailProvider from '../card/CardDetailProvider';
import { RootState } from '../../store';
import * as boardActions from '../../store/board/actions';
import * as checkListActions from '../../store/check_list/actions';
import * as fileActions from '../../store/file/actions';
import * as routeActions from '../../store/route/actions';
import { newListButtonText } from '../../utils/text';
import { isMobile, isTablet } from '../../utils/utils';

const dndBackend = (() => {
  const agent = window.navigator.userAgent;
  return isMobile(agent) || isTablet(agent) ? TouchBackend : HTML5Backend;
})();

const mapStateToProps = (state: RootState) => {
  const { board, route } = state;
  return {
    selectedBoard: board.selectedBoard,
    isRedirectToBoardIndex: route.isRedirectToBoardIndex,
  };
};

const mapDispatchToProps = {
  fetchBoard: boardActions.fetchBoard,
  fetchCheckLists: checkListActions.fetchCheckLists,
  fetchFiles: fileActions.fetchFiles,
  redirectToBoardIndex: routeActions.redirectToBoardIndex,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const Board = (props: PropsFromRedux) => {
  const {
    selectedBoard,
    isRedirectToBoardIndex,
    fetchBoard,
    fetchCheckLists,
    fetchFiles,
    redirectToBoardIndex,
  } = props;

  const { boardId } = useParams();
  const [isListFormVisible, setListFormVisible] = useState(false);

  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const castedBoardId = Number(boardId);
    if (boardId && castedBoardId) {
      fetchBoard(castedBoardId);
      fetchCheckLists(castedBoardId);
      fetchFiles(castedBoardId);
      return;
    }
    redirectToBoardIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAddListButton = () => {
    const agent = window.navigator.userAgent;
    const isEdge = agent.includes('Edge');
    if (isEdge) {
      setListFormVisible(true);
      return;
    }

    if (!listContainerRef || !listContainerRef.current) {
      return;
    }

    const { scrollWidth } = listContainerRef.current;
    listContainerRef.current.scrollTo(scrollWidth, 0);
    setListFormVisible(true);
  };

  if (isRedirectToBoardIndex) {
    return <Redirect to="/" />;
  }

  return (
    <DndProvider backend={dndBackend}>
      <div className="boardContainer" data-testid="boardComponent">
        <ToolBar boardName={selectedBoard.name} />

        <div ref={listContainerRef} className="listIndexContainer">
          {selectedBoard.lists?.map((list) => <List key={list.id} list={list} />)}

          {isListFormVisible ? (
            <ListForm setListFormVisible={setListFormVisible} />
          ) : (
            <div
              data-testid="addListButton"
              role="button"
              tabIndex={0}
              onClick={onClickAddListButton}
              onKeyPress={onClickAddListButton}
              className="addListButton"
            >
              <FontAwesomeIcon icon={['fas', 'plus']} className="addListButton__icon" />
              <div className="addListButton__text">{newListButtonText}</div>
            </div>
          )}
        </div>
      </div>
      <CardDetailProvider />
    </DndProvider>
  );
};

export default connector(Board);
