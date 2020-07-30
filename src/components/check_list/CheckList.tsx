import React, { useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import ButtonNoneBorder from '../common/ButtonNoneBorder';
import CheckListTitleForm from './CheckListTitleForm';
import CheckListProgressBar from './CheckListProgressBar';
import CheckListItemForm from '../check_list_item/CheckListItemForm';
import CheckListItem from '../check_list_item/CheckListItem';
import * as CheckListTypes from '../../store/check_list/types';
import { dialogTypeAsk } from '../../store/dialog/types';
import * as checkListActions from '../../store/check_list/actions';
import * as dialogActions from '../../store/dialog/actions';
import { addCheckListItem, deleteText, askCheckListDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  openDialog: dialogActions.openDialog,
  deleteCheckList: checkListActions.deleteCheckList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckListProps = PropsFromRedux & {
  checkList: CheckListTypes.CheckList
}

export const CheckList = (props: CheckListProps) => {
  const { checkList, openDialog, deleteCheckList } = props;

  const [isFormVisible, setFormVisible] = useState(false);
  const [isItemFormVisible, setItemFormVisible] = useState(false);

  const onClickDelete = () => {
    openDialog({
      type: dialogTypeAsk,
      title: askCheckListDeleteDialog,
      onConfirm: () => deleteCheckList(checkList.id),
    });
  };

  const closeItemForm = useCallback(() => {
    setItemFormVisible(false);
  }, []);

  return (
    <div data-testid="checkList" className="checkList">
      <div className="checkListHeader">
        {isFormVisible ? (
          <CheckListTitleForm
            setFormVisible={setFormVisible}
            checkListId={checkList.id}
            initialTitle={checkList.title}
          />
        ) : (
          <div
            data-testid="checkListTitle"
            role="button"
            tabIndex={0}
            onClick={() => setFormVisible(true)}
            onKeyPress={() => setFormVisible(true)}
            className="checkListHeader__label"
          >
            {checkList.title}
          </div>
        )}
        <ButtonNoneBorder buttonText={deleteText} onClick={onClickDelete} />
      </div>

      {checkList.items.length > 0 && <CheckListProgressBar items={checkList.items} />}

      <div data-testid="checkListItemContainer" className="checkListItemContainer">
        {checkList.items?.map((item) => <CheckListItem key={item.id} item={item} />)}
      </div>

      {isItemFormVisible ? (
        <CheckListItemForm checkListId={checkList.id} closeItemForm={closeItemForm} />
      ) : (
        <ButtonNoneBorder buttonText={addCheckListItem} onClick={() => setItemFormVisible(true)} />
      )}
    </div>
  );
};

export default connector(CheckList);
