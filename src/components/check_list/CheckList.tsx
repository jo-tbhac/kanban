import React, { useState } from 'react';

import ButtonNoneBorder from '../common/ButtonNoneBorder';
import CheckListTitleForm from './CheckListTitleForm';
import * as CheckListTypes from '../../store/check_list/types';
import { addCheckListItem, deleteText } from '../../utils/text';

type CheckListProps = {
  checkList: CheckListTypes.CheckList
}

const CheckList = (props: CheckListProps) => {
  const { checkList } = props;

  const [isFormVisible, setFormVisible] = useState(false);

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
            role="button"
            tabIndex={0}
            onClick={() => setFormVisible(true)}
            onKeyPress={() => setFormVisible(true)}
            className="checkListHeader__label"
          >
            {checkList.title}
          </div>
        )}
        <ButtonNoneBorder buttonText={deleteText} onClick={() => {}} />
      </div>
      <ButtonNoneBorder buttonText={addCheckListItem} onClick={() => {}} />
    </div>
  );
};

export default CheckList;
