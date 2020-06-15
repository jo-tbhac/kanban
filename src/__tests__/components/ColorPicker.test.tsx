import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import ColorPicker from '../../components/ColorPicker';

describe('<ColorPicker>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should call `setColor` and `setColorPickerVisible` when clicked a color icon', () => {
    const selectedColor = '#e53935';
    const setColor = jest.fn();
    const setColorPickerVisible = jest.fn();
    const { getByTestId } = render(
      <ColorPicker
        selectedColor={selectedColor}
        setColor={setColor}
        setColorPickerVisible={setColorPickerVisible}
      />,
      store,
    );

    fireEvent.click(getByTestId('colorPickerIcon-0'));
    expect(setColor).toHaveBeenCalledTimes(1);
    expect(setColorPickerVisible).toHaveBeenCalledTimes(1);
  });
});
