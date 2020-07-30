import React from 'react';

import { CheckListItem } from '../../store/check_list_item/types';

type CheckListProgressBarProps = {
  items: CheckListItem[]
}

const CheckListProgressBar = (props: CheckListProgressBarProps) => {
  const { items } = props;

  const percentage = (() => {
    const checkedItems = items.filter((item) => item.check);
    return Math.round((checkedItems.length / items.length) * 100);
  })();

  const modifire = percentage === 100 ? '--complete' : '';

  return (
    <div className="checkListProgressBarContainer">
      <div className="checkListProgressBarPercentage">
        {percentage}
      </div>
      <div className="checkListProgressBar">
        <div
          style={{ width: `${percentage}%` }}
          className={`checkListProgressBar__fill${modifire}`}
        />
      </div>
    </div>
  );
};

export default CheckListProgressBar;
