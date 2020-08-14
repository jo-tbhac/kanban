import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { Store } from '../../../store';
import { storeFactory } from '../../../testUtils';
import { mockBackgroundImage } from '../../../utils/mockData';
import { fetchBackgroundImages } from '../../../store/background_image/actions';

describe('backgroundImage actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `backgroundImages` upon dispatch an action `fetchBackgroundImages`', () => {
    const responseData = {
      backgroundImages: [
        { ...mockBackgroundImage, id: 1 },
        { ...mockBackgroundImage, id: 2 },
        { ...mockBackgroundImage, id: 3 },
      ],
    };
    const snakeCaseData = snakeCaseKeys(responseData, { deep: true });

    mock.onGet('/background_images').reply(200, snakeCaseData);

    return store.dispatch(fetchBackgroundImages() as any)
      .then(() => {
        const { backgroundImage } = store.getState();
        expect(backgroundImage.backgroundImages).toHaveLength(responseData.backgroundImages.length);
      });
  });
});
