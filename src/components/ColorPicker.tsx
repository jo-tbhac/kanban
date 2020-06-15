import React, {
  Dispatch,
  SetStateAction,
  MouseEvent,
  KeyboardEvent,
} from 'react';

import { CSSTransition } from 'react-transition-group';

const colors = [
  '#e53935',
  '#d81b60',
  '#7b1fa2',
  '#673ab7',
  '#303f9f',
  '#1565c0',
  '#0288d1',
  '#0097a7',
  '#009688',
  '#43a047',
  '#689f38',
  '#c0ca33',
  '#ffd600',
  '#f57c00',
  '#d84315',
  '#6d4c41',
  '#424242',
  '#37474f',
];

type ColorPickerProps = {
  setColorPickerVisible: Dispatch<SetStateAction<boolean>>
  setColor: Dispatch<SetStateAction<string>>
  selectedColor: string
}

const ColorPicker = (props: ColorPickerProps) => {
  const { setColorPickerVisible, setColor, selectedColor } = props;

  const onClickColorIcon = (event: MouseEvent&KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const pickedColor = event.currentTarget.dataset.color;

    if (pickedColor) {
      setColor(pickedColor);
      setColorPickerVisible(false);
    }
  };

  return (
    <CSSTransition in appear timeout={300} classNames="colorPicker">
      <div data-testid="colorPicker" className="colorPicker">
        {colors.map((color, index) => (
          <div
            data-testid={`colorPickerIcon-${index}`}
            key={color}
            aria-label={color}
            data-color={color}
            role="button"
            tabIndex={0}
            onClick={onClickColorIcon}
            onKeyPress={onClickColorIcon}
            style={{ backgroundColor: color }}
            className={selectedColor === color ? 'colorPicker__icon--selected' : 'colorPicker__icon'}
          />
        ))}
      </div>
    </CSSTransition>
  );
};

export default ColorPicker;
