import React from 'react';

import { cancelButtonText } from '../../utils/text';

type ButtonCancelProps = {
  onClick: () => void
}

const ButtonCancel = (props: ButtonCancelProps) => {
  const { onClick } = props;

  return (
    <button
      data-testid="buttonCancel"
      type="button"
      onClick={onClick}
      className="buttonCancel"
    >
      {cancelButtonText}
    </button>
  );
};

export default ButtonCancel;
