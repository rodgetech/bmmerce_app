import {
  combineReducers
} from "redux";
import types from './types';

const STATE = {
  gettingEngagements: false,
  engagements: [],
  gettingEngagement: false,
  engagement: {},
  empty: false
}

const MESSAGES = {
  gettingMessages: false,
  messages: [],
  totalPages: 0,
  currentPage: 0,
  unreadCount: 0
}

const engagementsReducer = (state = STATE, action) => {
  switch (action.type) {
    case types.GET_ENGAGEMENTS:
      {
        return {
          ...state,
          gettingEngagements: true,
        }
      }

    case types.GET_ENGAGEMENTS_SUCCESS:
      {
        const {
          engagements
        } = action;
        return {
          ...state,
          engagements,
          gettingEngagements: false,
          empty: engagements.length > 0 ? false : true
        }
      }

    case types.GET_ENGAGEMENT:
      {
        return {
          ...state,
          gettingEngagement: true,
        }
      }

    case types.GET_ENGAGEMENT_SUCCESS:
      {
        const {
          engagement
        } = action;
        return {
          ...state,
          engagement,
          gettingEngagement: false,
        }
      }

    default:
      return state;
  }
}

const messagesReducer = (state = MESSAGES, action) => {
  switch (action.type) {
    case types.GET_ENGAGEMENT_MESSAGES:
      {
        return {
          ...state,
          gettingMessages: true,
        }
      }

    case types.GET_ENGAGEMENT_MESSAGES_SUCCESS:
      {
        const {
          messages,
          currentPage,
          totalPages
        } = action;
        return {
          ...state,
          totalPages,
          currentPage,
          messages: currentPage === 1 ? messages : [...state.messages, ...messages],
          gettingMessages: false,
        }
      }

    case types.CREATE_ENGAGEMENT_MESSAGE:
      {
        return {
          ...state,
          creatingMessage: true,
        }
      }

    case types.CREATE_ENGAGEMENT_MESSAGE_SUCCESS:
      {
        const {
          message
        } = action;
        return {
          ...state,
          messages: [message, ...state.messages],
          creatingMessage: false,
        }
      }

    case types.CREATE_ENGAGEMENT_MESSAGE_FAILURE:
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

    case types.MARK_MESSAGES_READ_SUCCESS:
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

export default combineReducers({
  engagements: engagementsReducer,
  messages: messagesReducer,
});;