import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import ColorPicker from './ColorPicker';
import * as labelActions from '../store/label/actions';
import { labelNameFormPlaceholder, createButtonText, cancelButtonText } from '../utils/text';

const mapDispatchToProps = {
  createLabel: labelActions.createLabel,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type LabelFormProps = PropsFromRedux&{
  setLabelFormVisible: Dispatch<SetStateAction<boolean>>
}

const LabelForm = (props: LabelFormProps) => {
  const { setLabelFormVisible, createLabel } = props;

  const [labelName, setLabelName] = useState('');
  const [selectedColor, setColor] = useState('#e53935');
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const { boardID } = useParams();

  const onClickSubmit = () => {
    const castedBoardID = Number(boardID);
    if (castedBoardID) {
      const params = { name: labelName, color: selectedColor };
      createLabel(castedBoardID, params);
    }
  };

  return (
    <div className="labelFormContainer">
      <div className="labelForm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setColorPickerVisible(true)}
          onKeyPress={() => setColorPickerVisible(true)}
          style={{ backgroundColor: selectedColor }}
          className="labelForm__icon"
        >
          {isColorPickerVisible && (
            <ColorPicker
              selectedColor={selectedColor}
              setColor={setColor}
              setColorPickerVisible={setColorPickerVisible}
            />
          )}
        </div>
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
        <button
          type="button"
          onClick={onClickSubmit}
          disabled={labelName === ''}
          className="labelFormButton__submit"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default connector(LabelForm);
