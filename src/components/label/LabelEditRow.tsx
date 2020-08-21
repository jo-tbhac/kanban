import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import ColorPicker from '../common/ColorPicker';
import { Label } from '../../store/label/types';
import * as labelActions from '../../store/label/actions';
import * as dialogActions from '../../store/dialog/actions';
import { dialogTypeAsk } from '../../store/dialog/types';
import { labelNameFormPlaceholder, askLabelDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  updateLabel: labelActions.updateLabel,
  deleteLabel: labelActions.deleteLabel,
  openDialog: dialogActions.openDialog,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type LabelEditRowProps = PropsFromRedux&{
  label: Label
}

export const LabelEditRow = (props: LabelEditRowProps) => {
  const {
    label,
    updateLabel,
    deleteLabel,
    openDialog,
  } = props;

  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setColor] = useState(label.color);
  const [labelNameFormValue, setLabelNameFormValue] = useState(label.name);
  const isFirst = useRef(true);

  const onClickDelete = () => {
    openDialog({
      type: dialogTypeAsk,
      title: label.name,
      description: askLabelDeleteDialog,
      onConfirm: () => deleteLabel(label.id),
    });
  };

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
        aria-label="label-icon"
        role="button"
        tabIndex={0}
        onClick={() => setColorPickerVisible(true)}
        onKeyPress={() => setColorPickerVisible(true)}
        className="labelEditRow__icon"
        style={{ backgroundColor: label.color }}
      />
      {isColorPickerVisible && (
        <ColorPicker
          selectedColor={selectedColor}
          setColor={setColor}
          setColorPickerVisible={setColorPickerVisible}
        />
      )}
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
        <div
          data-testid="labelEditDeleteButton"
          role="button"
          tabIndex={0}
          onClick={onClickDelete}
          onKeyPress={onClickDelete}
          className="labelEditRow__delete"
        >
          <FontAwesomeIcon icon={['fas', 'trash-alt']} />
        </div>
      )}
    </div>
  );
};

export default connector(LabelEditRow);
