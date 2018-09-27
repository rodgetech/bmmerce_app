import types from './types';

const STATE = {
  deleting: false,
}

const imagesReducer = (state = STATE, action) => {
  switch (action.type) {
    case types.DELETE_IMAGE:
      {
        return {
          ...state,
          deleting: true,
        }
      }

    case types.DELETE_IMAGE_SUCCESS:
      {
        return {
          ...state,
          deleting: false,
        }
      }

    default:
      return state;
  }
}

export default imagesReducer;