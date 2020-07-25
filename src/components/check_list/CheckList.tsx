import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import ButtonNoneBorder from '../common/ButtonNoneBorder';
import CheckListTitleForm from './CheckListTitleForm';
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

const CheckList = (props: CheckListProps) => {
  const { checkList, openDialog, deleteCheckList } = props;

  const [isFormVisible, setFormVisible] = useState(false);

  const onClickDelete = () => {
    openDialog({
      type: dialogTypeAsk,
      title: askCheckListDeleteDialog,
      onConfirm: () => deleteCheckList(checkList.id),
    });
  };

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
      <ButtonNoneBorder buttonText={addCheckListItem} onClick={() => {}} />
    </div>
  );
};

export default connector(CheckList);
