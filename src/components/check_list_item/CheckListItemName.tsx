import React, { useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import FlexTextArea from '../common/FlexTextArea';
import { CheckListItem } from '../../store/check_list_item/types';
import * as checkListActions from '../../store/check_list_item/actions';
import { checkListItemNamePlaceholder } from '../../utils/text';

const mapDispatchToProps = {
  updateCheckListItem: checkListActions.updateCheckListItem,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckListItemNameProps = PropsFromRedux & {
  item: CheckListItem
}

export const CheckListItemName = (props: CheckListItemNameProps) => {
  const { item, updateCheckListItem } = props;

  const [isFormVisible, setFormVisible] = useState(false);
  const [name, setName] = useState(item.name);

  const openForm = useCallback(() => {
    setFormVisible(true);
  }, []);

  const onBlur = () => {
    if (name === '' || name === item.name) {
      setFormVisible(false);
      return;
    }
    updateCheckListItem(name, item.id, item.checkListId);
    setFormVisible(false);
  };

  const modifire = item.check ? '--checked' : '';

  return (
    <div className="checkListItemName">
      {isFormVisible ? (
        <FlexTextArea
          value={name}
          onChange={(event) => setName(event.target.value)}
          minHeight={60}
          placeholderText={checkListItemNamePlaceholder}
          autoFocus
          onBlur={onBlur}
        />
      ) : (
        <div
          data-testid="checkListItemName"
          role="button"
          tabIndex={0}
          onClick={openForm}
          onKeyPress={openForm}
          className={`checkListItemName__text${modifire}`}
        >
          {item.name}
        </div>
      )}
    </div>
  );
};

export default connector(CheckListItemName);
