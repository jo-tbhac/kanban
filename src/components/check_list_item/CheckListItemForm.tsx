import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import FlexTextArea from '../common/FlexTextArea';
import ButtonCancel from '../common/ButtonCancel';
import ButtonSubmit from '../common/ButtonSubmit';
import * as checkListItemActions from '../../store/check_list_item/actions';
import { addText, checkListItemNamePlaceholder } from '../../utils/text';

const mapDispatchToProps = {
  createCheckListItem: checkListItemActions.createCheckListItem,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckListItemFormProps = PropsFromRedux & {
  closeItemForm: () => void
  checkListId: number
}

const CheckListItemForm = (props: CheckListItemFormProps) => {
  const { createCheckListItem, closeItemForm, checkListId } = props;

  const [name, setName] = useState('');

  const submit = () => {
    createCheckListItem(name, checkListId);
    closeItemForm();
  };

  return (
    <div className="checkListItemForm">
      <FlexTextArea
        value={name}
        onChange={(event) => setName(event.target.value)}
        minHeight={60}
        placeholderText={checkListItemNamePlaceholder}
      />
      <div className="checkListItemFormButton">
        <ButtonCancel onClick={closeItemForm} />
        <ButtonSubmit onClick={submit} disabled={name === ''} buttonText={addText} />
      </div>
    </div>
  );
};

export default connector(CheckListItemForm);
