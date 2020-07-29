import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import Checkbox from './Checkbox';
import CheckListItemName from './CheckListItemName';
import * as checkListItemTypes from '../../store/check_list_item/types';
import { dialogTypeAsk } from '../../store/dialog/types';
import * as checkListItemActions from '../../store/check_list_item/actions';
import * as dialogActions from '../../store/dialog/actions';
import { askCheckListItemDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  deleteCheckListItem: checkListItemActions.deleteCheckListItem,
  openDialog: dialogActions.openDialog,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckListItemProps = PropsFromRedux & {
  item: checkListItemTypes.CheckListItem
}

export const CheckListItem = (props: CheckListItemProps) => {
  const { item, deleteCheckListItem, openDialog } = props;

  const onClickDelete = () => {
    openDialog({
      type: dialogTypeAsk,
      title: askCheckListItemDeleteDialog,
      onConfirm: () => deleteCheckListItem(item.id, item.checkListId),
    });
  };

  return (
    <div className="checkListItem">
      <Checkbox check={item.check} itemId={item.id} checkListId={item.checkListId} />
      <CheckListItemName item={item} />
      <div
        data-testid="checkListItemDelete"
        role="button"
        tabIndex={0}
        onClick={onClickDelete}
        onKeyPress={onClickDelete}
        className="checkListItem__delete"
      >
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </div>
    </div>
  );
};

export default connector(CheckListItem);
