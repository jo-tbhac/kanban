import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { storeFactory } from '../../../testUtils';
import { mockFile } from '../../../utils/mockData';
import { Store } from '../../../store';
import { fetchFiles } from '../../../store/file/actions';

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
});
