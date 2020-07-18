import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import ButtonSubmit from '../common/ButtonSubmit';
import ButtonCancel from '../common/ButtonCancel';
import * as listActions from '../../store/list/actions';
import { createButtonText, listNameFormPlaceholder } from '../../utils/text';

const mapDispatchToProps = {
  createList: listActions.createList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ListFormProps = PropsFromRedux&{
  setListFormVisible: Dispatch<SetStateAction<boolean>>
}

export const ListForm = (props: ListFormProps) => {
  const { setListFormVisible, createList } = props;

  const [listName, setListName] = useState('');
  const { boardId } = useParams();

  const onClickSubmit = () => {
    const castedBoardId = Number(boardId);
    if (boardId && castedBoardId) {
      createList(castedBoardId, { name: listName });
    }
    setListFormVisible(false);
  };

  return (
    <div data-testid="listForm" className="listFormContainer">
      <div className="listForm">
        <input
          data-testid="listNameTextField"
          type="text"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
          placeholder={listNameFormPlaceholder}
          className="listForm__textField"
        />
      </div>
      <div className="listFormButton">
        <ButtonCancel onClick={() => setListFormVisible(false)} />
        <ButtonSubmit
          onClick={onClickSubmit}
          disabled={listName === ''}
          buttonText={createButtonText}
        />
      </div>
    </div>
  );
};

export default connector(ListForm);
