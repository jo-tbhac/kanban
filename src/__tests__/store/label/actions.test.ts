import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockLabels } from '../../../utils/mockData';
import { Store } from '../../../store';
import { fetchAllLabel } from '../../../store/label/actions';

describe('label actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `labels` that recieved from server upon dispatch an action `fetchAllLabel` is successful', () => {
    const responseData = { labels: mockLabels };
    const boardID = 1;
    mock.onGet(`/board/${boardID}/labels`).reply(200, responseData);

    return store.dispatch(fetchAllLabel(boardID) as any)
      .then(() => {
        const { label } = store.getState();
        expect(label.labels).toEqual(mockLabels);
      });
  });
});
