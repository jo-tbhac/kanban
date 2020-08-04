import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { FileDeleteButton } from '../../../components/file/FileDeleteButton';

describe('FileDeleteButton component', () => {
  let store: Store;
  let deleteFile: jest.Mock;
  let openDialog: jest.Mock;
  const fileId = 1;

  beforeEach(() => {
    store = storeFactory();
    deleteFile = jest.fn();
    openDialog = jest.fn();
  });

  test('should call `openDialog` upon press a component', () => {
    const { getByRole } = render(
      <FileDeleteButton
        fileId={fileId}
        openDialog={openDialog}
        deleteFile={deleteFile}
      />,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(openDialog).toHaveBeenCalled();
  });
});
