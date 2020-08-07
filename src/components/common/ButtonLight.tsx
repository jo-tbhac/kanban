import React, { MouseEvent, KeyboardEvent } from 'react';

type ButtonLightProps = {
  text: string
  onClick: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
}

const ButtonLight = (props: ButtonLightProps) => {
  const { text, onClick } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="buttonLight"
    >
      {text}
    </div>
  );
};

export default ButtonLight;
