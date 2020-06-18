import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as listActions from '../store/list/actions';
import { createButtonText, cancelButtonText, listNameFormPlaceholder } from '../utils/text';

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
  const { boardID } = useParams();

  const onClickSubmit = () => {
    const castedBoardID = Number(boardID);
    if (boardID && castedBoardID) {
      createList(castedBoardID, { name: listName });
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
        <button
          data-testid="listFormCancelButton"
          type="button"
          onClick={() => setListFormVisible(false)}
          className="listFormButton__cancel"
        >
          {cancelButtonText}
        </button>
        <button
          data-testid="listFormSubmitButton"
          type="button"
          onClick={onClickSubmit}
          disabled={listName === ''}
          className="listFormButton__submit"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default connector(ListForm);
