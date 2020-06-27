import React from 'react';

type ButtonSubmitProps = {
  onClick: () => void
  disabled?: boolean
  buttonText: string
}

const ButtonSubmit = (props: ButtonSubmitProps) => {
  const { onClick, disabled, buttonText } = props;

  return (
    <button
      data-testid="buttonSubmit"
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="buttonSubmit"
    >
      {buttonText}
    </button>
  );
};

export default ButtonSubmit;
