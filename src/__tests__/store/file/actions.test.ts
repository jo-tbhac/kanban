import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { storeFactory } from '../../../testUtils';
import { mockFile } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { maxUploadFileSize } from '../../../utils/utils';
import { failedUploadFile, shouldLessThanMaxFileSize, failedDeleteFile } from '../../../utils/text';
import { fetchFiles, uploadFile, deleteFile } from '../../../store/file/actions';

describe('file actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `files` that recieved from server when an action of `fetchFiles` was successful', () => {
    const responseData = { files: [snakeCaseKeys(mockFile)] };
    const boardId = 1;

    mock.onGet(`/board/${boardId}/files`).reply(200, responseData);

    return store.dispatch(fetchFiles(boardId) as any)
      .then(() => {
        const { file } = store.getState();
        expect(file.files).toHaveLength(responseData.files.length);
        expect(file.files[0]).toEqual(mockFile);
      });
  });

  test('returns state `files` that added one record when an action of `uploadFile` was successful', () => {
    const responseData = { file: snakeCaseKeys(mockFile) };
    const previousState = store.getState().file;

    mock.onPost(`/card/${mockFile.cardId}/file`).reply(201, responseData);

    const fileData = new File([new ArrayBuffer(maxUploadFileSize)], 'file');

    return store.dispatch(uploadFile(fileData, mockFile.cardId) as any)
      .then(() => {
        const { file } = store.getState();
        expect(file.files).toHaveLength(previousState.files.length + 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `uploadFile` that have args of a file that size over `maxUploadFileSize`', () => {
    const fileData = new File([new ArrayBuffer(maxUploadFileSize), 'a'], 'file');

    return store.dispatch(uploadFile(fileData, mockFile.cardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUploadFile);
        expect(dialog.description).toBe(shouldLessThanMaxFileSize);
      });
  });

  test('returns state of dialogProps upon dispatch an action `uploadFile` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const fileData = new File(['a'], 'file');

    mock.onPost(`/card/${mockFile.cardId}/file`).reply(400, responseData);

    return store.dispatch(uploadFile(fileData, mockFile.cardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUploadFile);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `files` that deleted one record when an action of `deleteFile` was successful', () => {
    store = storeFactory({
      file: {
        files: [
          { ...mockFile, id: 1 },
          { ...mockFile, id: 2 },
          { ...mockFile, id: 3 },
        ],
      },
    });

    const fileId = 1;
    const previousState = store.getState().file;

    mock.onDelete(`/file/${fileId}`).reply(200);

    return store.dispatch(deleteFile(fileId) as any)
      .then(() => {
        const { file } = store.getState();
        expect(file.files).toHaveLength(previousState.files.length - 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteFile` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const fileId = 1;

    mock.onDelete(`/file/${fileId}`).reply(400, responseData);

    return store.dispatch(deleteFile(fileId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteFile);
        expect(dialog.description).toBe('some error...');
      });
  });
});
