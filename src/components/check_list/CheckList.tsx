import React from 'react';

import ButtonNoneBorder from '../common/ButtonNoneBorder';
import * as CheckListTypes from '../../store/check_list/types';
import { addCheckListItem, deleteText } from '../../utils/text';

type CheckListProps = {
  checkList: CheckListTypes.CheckList
}

const CheckList = (props: CheckListProps) => {
  const { checkList } = props;

  return (
    <div data-testid="checkList" className="checkList">
      <div className="checkListHeader">
        <div className="checkListHeader__label">{checkList.title}</div>
        <ButtonNoneBorder buttonText={deleteText} onClick={() => {}} />
      </div>
      <ButtonNoneBorder buttonText={addCheckListItem} onClick={() => {}} />
    </div>
  );
};

export default CheckList;
