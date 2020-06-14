import React, { useState } from 'react';

import { Label as LabelTypes } from '../store/label/types';

type LabelProps = {
  label: LabelTypes
}

const Label = (props: LabelProps) => {
  const { label } = props;

  const [isNameVisible, setNameVisible] = useState(false);

  return (
    <div className="label">
      <div
        onMouseEnter={() => setNameVisible(true)}
        onMouseLeave={() => setNameVisible(false)}
        style={{ backgroundColor: label.color }}
        className="label__icon"
      >
        {isNameVisible && <div className="label__name">{label.name}</div>}
      </div>
    </div>
  );
};

export default Label;
