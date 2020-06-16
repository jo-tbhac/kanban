import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockLabels, mockLabel } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { fetchAllLabel, createLabel, updateLabel } from '../../../store/label/actions';
import { failedCreateLabel, failedUpdateLabel } from '../../../utils/text';

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

  test('returns state `labels` that added one record upon dispatch an action `createLabel` is successful', () => {
    const params = { name: 'label', color: '#fff' };
    const responseData = { label: mockLabel };
    const boardID = 1;
    mock.onPost(`/board/${boardID}/label`).reply(201, responseData);

    const previousState = store.getState().label;

    return store.dispatch(createLabel(boardID, params) as any)
      .then(() => {
        const { label } = store.getState();
        expect(label.labels.length).toBe(previousState.labels.length + 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createLabel` and recieved status 400 from server', () => {
    const params = { name: 'label', color: '#fff' };
    const responseData = { errors: [{ text: 'some error...' }] };
    const boardID = 1;
    mock.onPost(`/board/${boardID}/label`).reply(400, responseData);

    return store.dispatch(createLabel(boardID, params) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateLabel);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `labels` that updated one record upon dispatch an action `updateLabel` is successful', () => {
    store = storeFactory({ label: { labels: mockLabels } });
    const params = { name: 'updated', color: '#222' };
    const responseData = { label: { id: 1, ...params } };
    const labelID = 1;
    mock.onPatch(`/label/${labelID}`).reply(200, responseData);

    return store.dispatch(updateLabel(labelID, params) as any)
      .then(() => {
        const { label } = store.getState();
        const updatedLabel = label.labels.find((l) => l.id === responseData.label.id);
        expect(updatedLabel?.name).toBe(params.name);
        expect(updatedLabel?.color).toBe(params.color);
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateLabel` and recieved status 400 from server', () => {
    const params = { name: 'label', color: '#fff' };
    const responseData = { errors: [{ text: 'some error...' }] };
    const labelID = 1;
    mock.onPatch(`/label/${labelID}`).reply(400, responseData);

    return store.dispatch(updateLabel(labelID, params) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateLabel);
        expect(dialog.description).toBe('some error...');
      });
  });
});
