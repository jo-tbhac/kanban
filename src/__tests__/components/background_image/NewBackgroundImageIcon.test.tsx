import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { BackgroundImage } from '../../../store/background_image/types';
import { mockBackgroundImage } from '../../../utils/mockData';
import NewBackgroundImageIcon from '../../../components/background_image/NewBackgroundImageIcon';

describe('NewBackgroundImageIcon component', () => {
  let store: Store;
  let selectImage: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    selectImage = jest.fn();
  });

  test('should call `selectImage` with `image.id` upon click a image component', () => {
    const image = { ...mockBackgroundImage, id: 1 } as BackgroundImage;
    const { getByRole } = render(
      <NewBackgroundImageIcon image={image} selectImage={selectImage} selectedImageId={0} />,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(selectImage).toHaveBeenCalledWith(image.id);
  });

  test('should render an overlay component if equal `selectedImageId` and `image.id`', () => {
    const selectedImageId = 1;
    const image = { ...mockBackgroundImage, id: selectedImageId } as BackgroundImage;
    const { getByTestId } = render(
      <NewBackgroundImageIcon
        image={image}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );

    expect(getByTestId('newBackgroundImageIconOverlay')).not.toBeNull();
  });

  test('should not render an overlay component if not equal `selectedImageId` and `image.id`', () => {
    const selectedImageId = 1;
    const image = { ...mockBackgroundImage, id: 2 } as BackgroundImage;
    const { queryByTestId } = render(
      <NewBackgroundImageIcon
        image={image}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );

    expect(queryByTestId('newBackgroundImageIconOverlay')).toBeNull();
  });
});
