import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import ColorPicker from './ColorPicker';
import { Label } from '../store/label/types';
import * as labelActions from '../store/label/actions';
import { labelNameFormPlaceholder } from '../utils/text';

const mapDispatchToProps = {
  updateLabel: labelActions.updateLabel,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type LabelEditRowProps = PropsFromRedux&{
  label: Label
}

const LabelEditRow = (props: LabelEditRowProps) => {
  const { label, updateLabel } = props;

  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setColor] = useState(label.color);
  const [labelNameFormValue, setLabelNameFormValue] = useState(label.name);
  const isFirst = useRef(true);

  const submit = () => {
    const params = { name: labelNameFormValue, color: selectedColor };
    updateLabel(label.id, params);
    setEditFormVisible(false);
  };

  const onBlur = () => {
    if (labelNameFormValue === '' || labelNameFormValue === label.name) {
      setLabelNameFormValue(label.name);
      setEditFormVisible(false);
      return;
    }
    submit();
  };

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  return (
    <div className="labelEditRow">
      <div
        data-testid="labelEditRowIcon"
        role="button"
        tabIndex={0}
        onClick={() => setColorPickerVisible(true)}
        onKeyPress={() => setColorPickerVisible(true)}
        className="labelEditRow__icon"
        style={{ backgroundColor: label.color }}
      >
        {isColorPickerVisible && (
          <ColorPicker
            selectedColor={selectedColor}
            setColor={setColor}
            setColorPickerVisible={setColorPickerVisible}
          />
        )}
      </div>
      {isEditFormVisible ? (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          data-testid="labelEditTextField"
          type="text"
          value={labelNameFormValue}
          onChange={(event) => setLabelNameFormValue(event.target.value)}
          onBlur={onBlur}
          placeholder={labelNameFormPlaceholder}
          className="labelEditRow__textField"
        />
      ) : (
        <div className="labelEditNameContainer">
          <div
            data-testid="labelEditName"
            role="button"
            tabIndex={0}
            onClick={() => setEditFormVisible(true)}
            onKeyPress={() => setEditFormVisible(true)}
            className="labelEditNameContainer__name"
          >
            {label.name}
          </div>
        </div>
      )}
      {!isEditFormVisible && (
        <div className="labelEditRow__delete">
          <FontAwesomeIcon icon={['fas', 'trash-alt']} />
        </div>
      )}
    </div>
  );
};

export default connector(LabelEditRow);
