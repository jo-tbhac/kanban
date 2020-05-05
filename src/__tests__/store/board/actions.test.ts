import { SHOW_BOARD_INDEX } from '../../../store/board/types';
import { showBoard, showBoardIndex } from '../../../store/board/actions';
import { storeFactory } from '../../../testUtils';
import dataStore from '../../../tmp_dataStore';

describe('board actions', () => {
  let store: any;
  beforeEach(() => {
    store = storeFactory();
  });

  test('returns an action with type `SHOW_BOARD_INDEX`', () => {
    const action = showBoardIndex();
    expect(action).toEqual({ type: SHOW_BOARD_INDEX });
  });

  test('returns an action with payload and type `SHOW_BOARD`', () => (
    store.dispatch(showBoard())
      .then(() => {
        const { board } = store.getState();
        expect(board.isIndexVisible).toBe(false);
        expect(board.selectedBoard).toEqual(dataStore[0]);
      })
  ));
});
