import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as listActions from '../store/list/actions';

const mapDispatchToProps = {
  updateList: listActions.updateList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ListNameFormProps = PropsFromRedux&{
  listId: number
  initialListName: string
  setListFormVisible: Dispatch<SetStateAction<boolean>>
}

export const ListNameForm = (props: ListNameFormProps) => {
  const {
    listId,
    initialListName,
    setListFormVisible,
    updateList,
  } = props;

  const [listName, setListName] = useState(initialListName);

  const onBlur = () => {
    if (listName === '' || listName === initialListName) {
      setListFormVisible(false);
      return;
    }
    updateList(listId, { name: listName });
    setListFormVisible(false);
  };

  return (
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
  );
};

export default connector(ListNameForm);
