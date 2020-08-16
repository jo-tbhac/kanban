import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { mockBackgroundImage } from '../../../utils/mockData';
import { Store } from '../../../store';
import { BackgroundImage } from '../../../store/background_image/types';
import { EditBackgroundImageIndex } from '../../../components/background_image/EditBackgroundImageIndex';

describe('EditBackgroundImageIndex component', () => {
  let store: Store;
  let goBackToMenu: jest.Mock;
  const backgroundImages = [
    { ...mockBackgroundImage, id: 1 },
    { ...mockBackgroundImage, id: 2 },
    { ...mockBackgroundImage, id: 3 },
  ] as BackgroundImage[];

  beforeEach(() => {
    store = storeFactory();
    goBackToMenu = jest.fn();
  });

  test('should render `EditBackgroundImageIcon` as many as `backgrounImages.length`', () => {
    const { getByTestId } = render(
      <EditBackgroundImageIndex goBackToMenu={goBackToMenu} backgroundImages={backgroundImages} />,
      store,
    );
    expect(getByTestId('editBackgroundImageIndex').children).toHaveLength(backgroundImages.length);
  });

  test('should call `goBackToMenu` upon click a go back button', () => {
    const { getByTestId } = render(
      <EditBackgroundImageIndex goBackToMenu={goBackToMenu} backgroundImages={backgroundImages} />,
      store,
    );
    fireEvent.click(getByTestId('editBackgroundImageCloseButton'));
    expect(goBackToMenu).toHaveBeenCalled();
  });
});
