import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as listActions from '../../store/list/actions';
import * as dialogActions from '../../store/dialog/actions';
import { dialogTypeAsk } from '../../store/dialog/types';
import { listMenuTitle, listMenuDelete, askListDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  openDialog: dialogActions.openDialog,
  deleteList: listActions.deleteList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ListMenuProps = PropsFromRedux&{
  listId: number
  setListMenuVisible: Dispatch<SetStateAction<boolean>>
}

export const ListMenu = (props: ListMenuProps) => {
  const {
    listId,
    setListMenuVisible,
    openDialog,
    deleteList,
  } = props;

  const closeListMenu = useCallback(({ target }) => {
    if (typeof target.className === 'string' && !target.className.includes('listMenu')) {
      setListMenuVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeListMenu);
    window.addEventListener('keypress', closeListMenu);
    return () => {
      window.removeEventListener('click', closeListMenu);
      window.removeEventListener('keypress', closeListMenu);
    };
  }, [closeListMenu]);

  const onClickDelete = () => {
    openDialog({
      type: dialogTypeAsk,
      title: askListDeleteDialog,
      onConfirm: () => deleteList(listId),
    });
  };

  return (
    <div data-testid="listMenu" className="listMenu">
      <div className="listMenuHeader">
        <div className="listMenuHeader__title">{listMenuTitle}</div>
        <div
          data-testid="listMenuCloseButton"
          role="button"
          tabIndex={0}
          onClick={() => setListMenuVisible(false)}
          onKeyPress={() => setListMenuVisible(false)}
          className="listMenuHeader__icon"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>
      <div
        data-testid="listMenuRowDelete"
        role="button"
        tabIndex={0}
        onClick={onClickDelete}
        onKeyPress={onClickDelete}
        className="listMenuRow"
      >
        {listMenuDelete}
      </div>
    </div>
  );
};

export default connector(ListMenu);
