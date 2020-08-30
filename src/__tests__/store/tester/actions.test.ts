import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { Tester } from '../../../store/tester/types';
import { fetchTesters } from '../../../store/tester/actions';

describe('tester actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('should returns testers data upon dispatch an action `fetchTesters` and recieved status `200`', () => {
    const responseData: { users: Tester[] } = {
      users: [
        {
          id: 1,
          name: 'tester1',
          email: 'tester1@test.com',
          expiresIn: 6000,
        }, {
          id: 2,
          name: 'tester2',
          email: 'tester2@test.com',
          expiresIn: 6000,
        },
      ],
    };

    mock.onGet('/testers').reply(200, responseData);

    return store.dispatch(fetchTesters() as any)
      .then(() => {
        const { tester } = store.getState();
        expect(tester.testers).toEqual(responseData.users);
      });
  });
});
