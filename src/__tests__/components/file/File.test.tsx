import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockFile } from '../../../utils/mockData';
import { fileCreateCover } from '../../../utils/text';
import { Store } from '../../../store';
import File from '../../../components/file/File';

describe('File component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  describe('if props of `file` has member `contentType: image/jpg`', () => {
    const file = { ...mockFile, contentType: 'image/jpg' };

    test('should render thumbnail', () => {
      const { getByAltText } = render(<File file={file} />, store);
      expect(getByAltText(mockFile.displayName)).not.toBeNull();
    });

    test('should render a text `カバーを作成`', () => {
      const { getByText } = render(<File file={file} />, store);
      expect(getByText(fileCreateCover)).not.toBeNull();
    });
  });

  describe('if props of `file` has member `contentType: image/jpeg`', () => {
    const file = { ...mockFile, contentType: 'image/jpeg' };

    test('should render thumbnail if props of `file` has member `contentType: image/jpeg`', () => {
      const { getByAltText } = render(<File file={file} />, store);
      expect(getByAltText(mockFile.displayName)).not.toBeNull();
    });

    test('should render a text `カバーを作成`', () => {
      const { getByText } = render(<File file={file} />, store);
      expect(getByText(fileCreateCover)).not.toBeNull();
    });
  });

  describe('if props of `file` has member `contentType: image/png`', () => {
    const file = { ...mockFile, contentType: 'image/png' };

    test('should render thumbnail if props of `file` has member `contentType: image/jpeg`', () => {
      const { getByAltText } = render(<File file={file} />, store);
      expect(getByAltText(mockFile.displayName)).not.toBeNull();
    });

    test('should render a text `カバーを作成`', () => {
      const { getByText } = render(<File file={file} />, store);
      expect(getByText(fileCreateCover)).not.toBeNull();
    });
  });

  describe('if props of `file` has member `contentType` is not `image/jpg`, `image/jpeg` and `image/png`', () => {
    const file = { ...mockFile, contentType: 'application/zip', displayName: 'sample.zip' };

    test('should not render thumbnail', () => {
      const { queryByAltText } = render(<File file={file} />, store);
      expect(queryByAltText(mockFile.displayName)).toBeNull();
    });

    test('should render a extention', () => {
      const { getByText } = render(<File file={file} />, store);
      expect(getByText('zip')).not.toBeNull();
    });

    test('should not render a text `カバーを作成`', () => {
      const { queryByText } = render(<File file={file} />, store);
      expect(queryByText(fileCreateCover)).toBeNull();
    });
  });

  test('should show `Lightbox` upon press a component', () => {
    const { getByTestId } = render(<File file={mockFile} />, store);
    fireEvent.click(getByTestId('file'));
    expect(getByTestId('lightboxOverlay')).not.toBeNull();
  });

  test('should not render `Lightbox` if state of `isLightboxVisible` is false', () => {
    const { queryByTestId } = render(<File file={mockFile} />, store);
    expect(queryByTestId('lightboxOverlay')).toBeNull();
  });
});
