import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteMatch } from 'react-router-dom';

import { boardMenuTitle } from '../../utils/text';
import BoardMenu from './BoardMenu';

const BoardMenuButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const match = useRouteMatch<{ boardId: string }>('/board/:boardId');

  if (!match) {
    return null;
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setMenuVisible(true)}
        onKeyPress={() => setMenuVisible(true)}
        className="boardMenuButton"
      >
        <FontAwesomeIcon icon={['fas', 'cog']} />
        <div className="boardMenuButton__text">{boardMenuTitle}</div>
      </div>
      {isMenuVisible && <BoardMenu closeMenu={() => setMenuVisible(false)} />}
    </>
  );
};

export default BoardMenuButton;
