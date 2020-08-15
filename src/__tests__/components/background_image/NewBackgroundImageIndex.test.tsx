import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { BackgroundImage } from '../../../store/background_image/types';
import { mockBackgroundImage } from '../../../utils/mockData';
import { NewBackgroundImageIndex, pagePer } from '../../../components/background_image/NewBackgroundImageIndex';

describe('NewBackgroundImageIndex component', () => {
  let store: Store;
  let selectImage: jest.Mock;
  let backgroundImages: BackgroundImage[];
  const selectedImageId = 1;

  beforeEach(() => {
    store = storeFactory();
    backgroundImages = [
      { ...mockBackgroundImage, id: 1 },
      { ...mockBackgroundImage, id: 2 },
      { ...mockBackgroundImage, id: 3 },
      { ...mockBackgroundImage, id: 4 },
      { ...mockBackgroundImage, id: 5 },
      { ...mockBackgroundImage, id: 6 },
      { ...mockBackgroundImage, id: 7 },
      { ...mockBackgroundImage, id: 8 },
    ] as BackgroundImage[];
  });

  test('should render four children component', () => {
    const { getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    expect(getByTestId('newBackgroundImageIndex').children).toHaveLength(pagePer);
  });

  test('should disabled a go back button if current page is first', () => {
    const { getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    expect(getByTestId('angle-left')).toBeDisabled();
  });

  test('should enable a go back button if current page is not first', () => {
    const { getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    fireEvent.click(getByTestId('angle-right'));
    expect(getByTestId('angle-left')).not.toBeDisabled();
  });

  test('should disabled a go forward button if current page is last', () => {
    const { getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    fireEvent.click(getByTestId('angle-right'));
    expect(getByTestId('angle-right')).toBeDisabled();
  });

  test('should enable a go forward button if current page is not last', () => {
    const { getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    expect(getByTestId('angle-right')).not.toBeDisabled();
  });

  test('should render the first to fourth component', () => {
    const { getByAltText, queryByAltText } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );

    for (let i = 0; i < backgroundImages.length; i += 1) {
      if (i < 4) {
        expect(getByAltText(`background${backgroundImages[i].id}`)).not.toBeNull();
      } else {
        expect(queryByAltText(`background${backgroundImages[i].id}`)).toBeNull();
      }
    }
  });

  test('should render the fourth to eighth component', () => {
    const { getByAltText, queryByAltText, getByTestId } = render(
      <NewBackgroundImageIndex
        backgroundImages={backgroundImages}
        selectImage={selectImage}
        selectedImageId={selectedImageId}
      />,
      store,
    );
    fireEvent.click(getByTestId('angle-right'));

    for (let i = 0; i < backgroundImages.length; i += 1) {
      if (i > 3 && i < 8) {
        expect(getByAltText(`background${backgroundImages[i].id}`)).not.toBeNull();
      } else {
        expect(queryByAltText(`background${backgroundImages[i].id}`)).toBeNull();
      }
    }
  });
});
