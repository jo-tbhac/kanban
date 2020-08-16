import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { mockBackgroundImage, mockBoard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { BackgroundImage } from '../../../store/background_image/types';
import { EditBackgroundImageIcon } from '../../../components/background_image/EditBackgroundImageIcon';

describe('EditBackgroundImageIcon component', () => {
  let store: Store;
  let updateBackgroundImage: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    updateBackgroundImage = jest.fn();
  });

  test('should call `updateBackgroundImage` with `boardId` and `imageId` upon click a component', () => {
    const boardId = 1;
    const imageId = 2;
    const image = { ...mockBackgroundImage, id: imageId } as BackgroundImage;
    const selectedBoard = {
      ...mockBoard,
      id: boardId,
      backgroundImage: { boardId, backgroundImageId: imageId },
    };

    const { getByRole } = render(
      <EditBackgroundImageIcon
        selectedBoard={selectedBoard}
        image={image}
        updateBackgroundImage={updateBackgroundImage}
      />,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(updateBackgroundImage).toHaveBeenCalledWith(boardId, imageId);
  });

  test('should render an overlay component if equal `selectedBoard.backgroundImage.backgroundImageId` and `image.id` that provided from props', () => {
    const boardId = 1;
    const imageId = 2;
    const image = { ...mockBackgroundImage, id: imageId } as BackgroundImage;
    const selectedBoard = {
      ...mockBoard,
      id: boardId,
      backgroundImage: { boardId, backgroundImageId: imageId },
    };

    const { getByTestId } = render(
      <EditBackgroundImageIcon
        selectedBoard={selectedBoard}
        image={image}
        updateBackgroundImage={updateBackgroundImage}
      />,
      store,
    );

    expect(getByTestId('editBackgroundImageOverlay')).not.toBeNull();
  });

  test('should not render an overlay component if not equal `selectedBoard.backgroundImage.backgroundImageId` and `image.id` that provided from props', () => {
    const boardId = 1;
    const imageId = 2;
    const image = { ...mockBackgroundImage, id: 3 } as BackgroundImage;
    const selectedBoard = {
      ...mockBoard,
      id: boardId,
      backgroundImage: { boardId, backgroundImageId: imageId },
    };

    const { queryByTestId } = render(
      <EditBackgroundImageIcon
        selectedBoard={selectedBoard}
        image={image}
        updateBackgroundImage={updateBackgroundImage}
      />,
      store,
    );

    expect(queryByTestId('editBackgroundImageOverlay')).toBeNull();
  });
});
