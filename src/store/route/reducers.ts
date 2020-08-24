import {
  REDIRECT_TO_BOARD_INDEX,
  INIT_REDIRECT_TO_BOARD_INDEX,
  RouteState,
  RouteActionTypes,
} from './types';

const initialState: RouteState = {
  isRedirectToBoardIndex: false,
};

const routeReducer = (state = initialState, action: RouteActionTypes) => {
  switch (action.type) {
    case REDIRECT_TO_BOARD_INDEX:
      return {
        ...state,
        isRedirectToBoardIndex: true,
      };
    case INIT_REDIRECT_TO_BOARD_INDEX:
      return {
        ...state,
        isRedirectToBoardIndex: false,
      };
    default:
      return state;
  }
};

export default routeReducer;
