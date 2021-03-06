import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import ColorPicker from '../common/ColorPicker';
import ButtonSubmit from '../common/ButtonSubmit';
import ButtonCancel from '../common/ButtonCancel';
import * as labelActions from '../../store/label/actions';
import { labelNameFormPlaceholder, createButtonText } from '../../utils/text';

const mapDispatchToProps = {
  createLabel: labelActions.createLabel,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type LabelFormProps = PropsFromRedux&{
  setLabelFormVisible: Dispatch<SetStateAction<boolean>>
}

export const LabelForm = (props: LabelFormProps) => {
  const { setLabelFormVisible, createLabel } = props;

  const [labelName, setLabelName] = useState('');
  const [selectedColor, setColor] = useState('#e53935');
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const { boardId } = useParams();

  const onClickSubmit = () => {
    const castedBoardId = Number(boardId);
    if (castedBoardId) {
      const params = { name: labelName, color: selectedColor };
      createLabel(castedBoardId, params);
    }
  };

  return (
    <div data-testid="labelForm" className="labelFormContainer">
      <div className="labelForm">
        <div
          data-testid="labelFormColorIcon"
          aria-label="label-icon"
          role="button"
          tabIndex={0}
          onClick={() => setColorPickerVisible(true)}
          onKeyPress={() => setColorPickerVisible(true)}
          style={{ backgroundColor: selectedColor }}
          className="labelForm__icon"
        />
        {isColorPickerVisible && (
          <ColorPicker
            selectedColor={selectedColor}
            setColor={setColor}
            setColorPickerVisible={setColorPickerVisible}
          />
        )}
        <input
          data-testid="labelNameTextField"
          type="text"
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
          placeholder={labelNameFormPlaceholder}
          className="labelForm__textField"
        />
      </div>
      <div className="labelFormButton">
        <ButtonCancel onClick={() => setLabelFormVisible(false)} />
        <ButtonSubmit
          onClick={onClickSubmit}
          disabled={labelName === ''}
          buttonText={createButtonText}
        />
      </div>
    </div>
  );
};

export default connector(LabelForm);
