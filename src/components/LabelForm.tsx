import React, { useState, Dispatch, SetStateAction } from 'react';

import { labelNameFormPlaceholder, createButtonText, cancelButtonText } from '../utils/text';

type LabelFormProps = {
  setLabelFormVisible: Dispatch<SetStateAction<boolean>>
}

const LabelForm = (props: LabelFormProps) => {
  const { setLabelFormVisible } = props;
  const [labelName, setLabelName] = useState('');

  return (
    <div className="labelFormContainer">
      <div className="labelForm">
        <div className="labelForm__icon" />
        <input
          type="text"
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
          placeholder={labelNameFormPlaceholder}
          className="labelForm__textIput"
        />
      </div>
      <div className="labelFormButton">
        <button type="button" onClick={() => setLabelFormVisible(false)} className="labelFormButton__cancel">
          {cancelButtonText}
        </button>
        <button type="button" className="labelFormButton__submit">{createButtonText}</button>
      </div>
    </div>
  );
};

export default LabelForm;
