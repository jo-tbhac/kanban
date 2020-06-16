import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Label } from '../store/label/types';

type LabelEditRowProps = {
  label: Label
}

const LabelEditRow = (props: LabelEditRowProps) => {
  const { label } = props;

  return (
    <div className="labelEditRow">
      <div className="labelEditRow__icon" style={{ backgroundColor: label.color }} />
      <div className="labelEditRow__name">{label.name}</div>
      <div className="labelEditRow__delete">
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </div>
    </div>
  );
};

export default LabelEditRow;
