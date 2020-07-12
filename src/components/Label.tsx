import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import * as labelActions from '../store/label/actions';
import { Label as LabelTypes } from '../store/label/types';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    selectedLabelIds: label.selectedLabelIds,
  };
};

const mapDispatchToProps = {
  checkLabel: labelActions.checkLabel,
  uncheckLabel: labelActions.uncheckLabel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type LabelProps = PropsFromRedux & {
  label: LabelTypes
}

const Label = (props: LabelProps) => {
  const {
    label,
    selectedLabelIds,
    checkLabel,
    uncheckLabel,
  } = props;

  const [isNameVisible, setNameVisible] = useState(false);

  const labelIconProps = selectedLabelIds.includes(label.id)
    ? { className: 'label__icon--checked', onClick: () => uncheckLabel(label.id) }
    : { className: 'label__icon', onClick: () => checkLabel(label.id) };

  return (
    <div className="label">
      <div
        data-testid="labelIcon"
        role="button"
        tabIndex={0}
        onClick={labelIconProps.onClick}
        onKeyPress={labelIconProps.onClick}
        onMouseEnter={() => setNameVisible(true)}
        onMouseLeave={() => setNameVisible(false)}
        style={{ backgroundColor: label.color }}
        className={labelIconProps.className}
      >
        {isNameVisible && <div data-testid="labelName" className="label__name">{label.name}</div>}
      </div>
    </div>
  );
};

export default connector(Label);
