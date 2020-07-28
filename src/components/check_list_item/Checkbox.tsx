import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CheckboxProps = {
  check: boolean
}

const Checkbox = (props: CheckboxProps) => {
  const { check } = props;

  const [isCheck, setCheck] = useState(check);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setCheck(!isCheck)}
      onKeyPress={() => setCheck(!isCheck)}
      className="checkbox"
    >
      <FontAwesomeIcon icon={['fas', 'check']} className="checkbox__icon" />
    </div>
  );
};

export default Checkbox;
