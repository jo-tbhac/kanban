import { SHOW_BOARD_INDEX, SHOW_BOARD, BoardState } from '../../../store/board/types';
import boardReducer from '../../../store/board/reducers';
import dataStore from '../../../tmp_dataStore';

describe('board reducer', () => {
  let initialState: BoardState;
  beforeEach(() => {
    initialState = {
      isIndexVisible: true,
      selectedBoard: {
        id: 0,
        title: '',
        updatedAt: '',
        lists: [],
      },
    };
  });

  test('returns state upon recieving an action type `SHOW_BOARD_INDEX`', () => {
    const previousState = { ...initialState, isIndexVisible: false };
    const newState = boardReducer(previousState, { type: SHOW_BOARD_INDEX });
    expect(newState.isIndexVisible).toBe(true);
  });

  test('returns state upon recieving an action type `SHOW_BOARD`', () => {
    const newState = boardReducer(initialState, { type: SHOW_BOARD, payload: dataStore[0] });
    expect(newState.isIndexVisible).toBe(false);
    expect(newState.selectedBoard).toEqual(dataStore[0]);
  });
});
