import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as listActions from '../store/list/actions';

const mapDispatchToProps = {
  updateList: listActions.updateList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ListNameProps = PropsFromRedux & {
  listId: number
  initialListName: string
}

export const ListName = (props: ListNameProps) => {
  const { listId, initialListName, updateList } = props;

  const [listName, setListName] = useState(initialListName);
  const [isListFormVisible, setListFormVisible] = useState(false);

  const onBlur = () => {
    if (listName === '' || listName === initialListName) {
      setListFormVisible(false);
      return;
    }
    updateList(listId, { name: listName });
    setListFormVisible(false);
  };

  return (
    isListFormVisible ? (
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        data-testid="listNameForm"
        type="text"
        maxLength={50}
        value={listName}
        onChange={(event) => setListName(event.target.value)}
        onBlur={onBlur}
        className="listNameForm"
      />
    ) : (
      <div
        data-testid="listName"
        role="button"
        tabIndex={0}
        onClick={() => setListFormVisible(true)}
        onKeyPress={() => setListFormVisible(true)}
        className="listName"
      >
        {initialListName}
      </div>
    )
  );
};

export default connector(ListName);
