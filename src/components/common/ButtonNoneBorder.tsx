import React from 'react';

type ButtonNoneBorderProps = {
  buttonText: string
  onClick: () => void
}

const ButtonNoneBorder = (props: ButtonNoneBorderProps) => {
  const { buttonText, onClick } = props;

  return (
    <button type="button" onClick={onClick} className="buttonNoneBorder">
      {buttonText}
    </button>
  );
};

export default ButtonNoneBorder;
