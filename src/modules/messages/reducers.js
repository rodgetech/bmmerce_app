import types from './types';

const STATE = {
  messages: [],
  message: {},
  creatingMessage: false,
  createMessageErrors: [],
  unreadCount: 0
}


const messagesReducer = (state = STATE, action) => {
  switch (action.type) {

    case types.CREATE_MESSAGE:
      {
        return {
          ...state,
          creatingMessage: true,
        }
      }

    case types.CREATE_MESSAGE_SUCCESS:
      {
        const {
          message
        } = action;
        return {
          ...state,
          messages: [...state.messages, message],
          creatingMessage: false,
        }
      }

    case types.CREATE_MESSAGE_FAILURE:
      {
        const {
          createMessageErrors
        } = action;
        return {
          ...state,
          createMessageErrors,
          creatingMessage: false,
        }
      }

    case types.GET_UNREAD_COUNT_SUCCESS:
      {
        const {
          unreadCount
        } = action;
        return {
          ...state,
          unreadCount,
        }
      }

    default:
      return state;
  }
}

export default messagesReducer;