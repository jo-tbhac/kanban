import React, { useState, SetStateAction, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as checkListActions from '../../store/check_list/actions';

const mapDispatchToProps = {
  updateCheckList: checkListActions.updateCheckList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckListTitleFormProps = PropsFromRedux & {
  initialTitle: string
  checkListId: number
  setFormVisible: Dispatch<SetStateAction<boolean>>
}

export const CheckListTitleForm = (props: CheckListTitleFormProps) => {
  const {
    initialTitle,
    checkListId,
    setFormVisible,
    updateCheckList,
  } = props;

  const [title, setTitle] = useState(initialTitle);

  const onBlur = () => {
    if (title === initialTitle || title === '') {
      setFormVisible(false);
      return;
    }
    updateCheckList(checkListId, title);
    setFormVisible(false);
  };

  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      data-testid="checkListTitleForm"
      type="text"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      onBlur={onBlur}
      className="checkListTitleForm"
    />
  );
};

export default connector(CheckListTitleForm);
