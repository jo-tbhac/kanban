import React, { ChangeEvent } from 'react';

import { checkListTitleLabel, checkListTitlePlaceholder } from '../../utils/text';

type CheckListFormProps = {
  title: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const CheckListForm = (props: CheckListFormProps) => {
  const { title, onChange } = props;

  return (
    <div className="checkListForm">
      <div className="checkListForm__label">{checkListTitleLabel}</div>
      <input
        type="text"
        value={title}
        onChange={onChange}
        placeholder={checkListTitlePlaceholder}
        className="checkListForm__textField"
      />
    </div>
  );
};

export default CheckListForm;
