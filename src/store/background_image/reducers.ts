import {
  FETCH_BACKGROUND_IMAGES,
  BackgroundImageState,
  BackgroundImageActionTypes,
} from './types';

const initialState: BackgroundImageState = {
  backgroundImages: [],
};

const backgroundImageReducer = (state = initialState, action: BackgroundImageActionTypes) => {
  switch (action.type) {
    case FETCH_BACKGROUND_IMAGES:
      return {
        ...state,
        backgroundImages: action.payload,
      };
    default:
      return state;
  }
};

export default backgroundImageReducer;
