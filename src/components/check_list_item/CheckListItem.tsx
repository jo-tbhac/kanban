import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from './Checkbox';
import * as checkListTypes from '../../store/check_list_item/types';

type CheckListItemProps = {
  item: checkListTypes.CheckListItem
}

const CheckListItem = (props: CheckListItemProps) => {
  const { item } = props;

  const modifire = item.check ? '--checked' : '';

  return (
    <div className="checkListItem">
      <Checkbox check={item.check} itemId={item.id} checkListId={item.checkListId} />
      <div className={`checkListItem__name${modifire}`}>{item.name}</div>
      <div className="checkListItem__delete">
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </div>
    </div>
  );
};

export default CheckListItem;