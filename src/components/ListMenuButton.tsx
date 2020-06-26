import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListMenu from './ListMenu';

type ListMenuButtonProps = {
  listId: number
}

const ListMenuButton = (props: ListMenuButtonProps) => {
  const { listId } = props;

  const [isListMenuVisible, setListMenuVisible] = useState(false);

  return (
    <>
      <div
        data-testid="listMenuButton"
        role="button"
        tabIndex={0}
        onClick={() => setListMenuVisible(true)}
        onKeyPress={() => setListMenuVisible(true)}
        className="listMenuButton"
      >
        <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
      </div>
      {isListMenuVisible && <ListMenu listId={listId} setListMenuVisible={setListMenuVisible} />}
    </>
  );
};

export default ListMenuButton;
