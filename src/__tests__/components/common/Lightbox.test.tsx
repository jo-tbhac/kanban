import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import Lightbox from '../../../components/common/Lightbox';
import { lightboxOpenNewTab, lightboxNoPreview, downloadText } from '../../../utils/text';

describe('Lightbox component', () => {
  let store: Store;
  let close: jest.Mock;
  const url = 'sample url';
  const displayName = 'test.png';

  beforeEach(() => {
    store = storeFactory();
    close = jest.fn();
  });

  test('should render an image if props of `isImage` is true', () => {
    const { getByAltText, queryByText } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage />,
      store,
    );
    expect(getByAltText(displayName)).not.toBeNull();
    expect(queryByText(lightboxNoPreview)).toBeNull();
  });

  test('should not render an image if props of `isImage` is false', () => {
    const { queryByAltText, getByText } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage={false} />,
      store,
    );
    expect(getByText(lightboxNoPreview)).not.toBeNull();
    expect(queryByAltText(displayName)).toBeNull();
  });

  test('should render a text `lightboxOpenNewTab` if props of `isImage` is true', () => {
    const { getByText, queryByText } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage />,
      store,
    );
    expect(getByText(lightboxOpenNewTab)).not.toBeNull();
    expect(queryByText(downloadText)).toBeNull();
  });

  test('should render a text `downloadText` if props of `isImage` is false', () => {
    const { getByText, queryByText } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage={false} />,
      store,
    );
    expect(queryByText(lightboxOpenNewTab)).toBeNull();
    expect(getByText(downloadText)).not.toBeNull();
  });

  test('should call `close` upon press a close button', () => {
    const { getByTestId } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage={false} />,
      store,
    );

    fireEvent.click(getByTestId('lightboxCloseButton'));
    expect(close).toHaveBeenCalled();
  });

  test('should call `close` upon press an overlay component', () => {
    const { getByTestId } = render(
      <Lightbox url={url} displayName={displayName} close={close} isImage={false} />,
      store,
    );

    fireEvent.click(getByTestId('lightboxOverlay'));
    expect(close).toHaveBeenCalled();
  });
});
